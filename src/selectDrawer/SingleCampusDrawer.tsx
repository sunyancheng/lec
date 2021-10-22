/**
 * 选择教学中心
 * value?: string[];
 * onChange: (value: string[]) => void;
 * visible?: boolean;
 * maxTagCount?: number;
 * className?: CSSProperties;
 * drawerClassName?: string;
 * style?: CSSProperties;
 * drawerStyle?: CSSProperties;
 * customSelectElement?: (params: CustomSelectParams) => ReactNode; // 自定义选择节点
 * 
 * e.g. （一）
 * <CampusDrawer value={campusIds} onChange={setCampusIds} />
 * 
 * e.g. （一）自定义选择节点
 * <CampusDrawer
      value={campusIds}
      onChange={setCampusIds}
      customSelectElement={({ onClick }) => <Button onClick={onClick}>show</Button>}
   />
 */
import { Drawer, Input, Radio, Spin, Tabs } from "leap-ui";
import React, { CSSProperties, FunctionComponent, memo, ReactNode, useRef, useState } from "react";
import { CustomSelectBox } from "./CustomSelectBox";
import classNames from "classnames";
import useRequest from "@luban-hooks/use-request";
import { AxiosResponse } from "axios";
import styles from "./singleCampusDrawer.less";

type campusProps = {
  "1": {
  id: number;
  name: string;
  city_id: number;
  };
};
type schoolProps = {"0": {
  id: number;
  campus_name: string;
  longitude: string;
  latitude: string;
  campus_abbr: string;
  city_id: number;
  campus_area_id: number;
  campus_address: string;
  cmps_town_county: string;
}[]};
interface CustomSelectParams {
  onClick: () => void;
}

export interface SingleCampusDrawerProps {
  showAllCenter?: boolean;
  value?: string[];
  onChange?: (value: string[]) => void;
  visible?: boolean;
  className?: CSSProperties;
  drawerClassName?: string;
  style?: CSSProperties;
  drawerStyle?: CSSProperties;
  disabled?: boolean;
  customSelectElement?: (params: CustomSelectParams) => ReactNode;
  api: {
    fetchCampusApi: (params: any) => Promise<AxiosResponse<any>>;
    fetchSchoolsApi: (params: any) => Promise<AxiosResponse<any>>;
  }
}

export const SingleCampusDrawer: FunctionComponent<SingleCampusDrawerProps> = memo(
  ({
    onChange,
    visible = false,
    className,
    style = {},
    drawerClassName,
    drawerStyle = {},
    customSelectElement,
    disabled = false,
    value,
    showAllCenter,
    api
  }) => {
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const [tabsActive, setTabsActive] = useState<string>("1");
    const [campusData, setCampusData] = useState<{ key: string; tab: string }[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [schoolNames, setSchoolNames] = useState<Record<string, string>>({});
    const [schoolData, setSchoolData] = useState<schoolProps>({} as schoolProps);
    const baseSchool = useRef<schoolProps>({} as schoolProps);

    const { data: campusMap } = useRequest(api.fetchCampusApi, {
      initialData: {},
      formatter: (res) => res.data?.data || {},
      onSuccess: (data:campusProps) => {
        setCampusData(
          Object.values(data).map((child) => ({
            key: `${child.id}`,
            tab: child.name,
          })),
        );
      },
    });
    const { loading } = useRequest(api.fetchSchoolsApi, {
      formatter: (res) => res.data?.data?.school_list || {},
      onSuccess: (data:schoolProps) => {
        const names: Record<string, string> = {};
        Object.values(data).forEach((child) => {
          (child || []).forEach((school) => (names[`${school.id}`] = school.campus_name));
        });
        baseSchool.current = { ...data };
        setSchoolData({ ...data });
        setSchoolNames({ ...schoolNames, ...names });
      },
    });

    const onSearch = (v: string) => {
      setSchoolData(
        v
          ? Object.entries({ ...baseSchool.current }).reduce<schoolProps>(
              (res, [key, values]) => ({
                ...res,
                [key as keyof schoolProps]: values.filter((ele) => ele.campus_name.includes(v)),
              }),
              {} as schoolProps,
            )
          : { ...baseSchool.current },
      );
    };

    const afterVisibleChange = (v: boolean) => {
      if (v) {
        setSearchValue("");
        onSearch("");
        if (value && value[0]) setTabsActive(`${value[0]}`);
      }
    };
    return (
      <>
        {!customSelectElement ? (
          <CustomSelectBox
            className={className}
            disabled={disabled}
            style={{ width: 280, ...style }}
            onClear={() => {
              if (onChange && !disabled) onChange([]);
            }}
            onOpen={() => !disabled && setShowDrawer(true)}
            showValue={
              value?.length === 2
                ? `${campusMap[value[0] as keyof campusProps]?.name} / ${
                    `${value[1]}` === "0" ? "全部" : schoolNames[value[1]]
                  }`
                : ""
            }
          />
        ) : (
          customSelectElement({ onClick: () => setShowDrawer(true) })
        )}
        <Drawer
          title={
            <div className={styles["drawerTitle"]}>
              <div className="name">选择教学中心</div>
              <Input.Search
                value={searchValue}
                placeholder="请输入关键字"
                onChange={(e) => setSearchValue(e.target.value)}
                onSearch={onSearch}
              />
            </div>
          }
          closable={false}
          className={classNames(styles["drawer"], {
            [drawerClassName || ""]: drawerClassName,
          })}
          visible={showDrawer || visible}
          onClose={() => setShowDrawer(false)}
          style={drawerStyle}
          width={685}
          afterVisibleChange={afterVisibleChange}
        >
          <Spin spinning={loading}>
            {!schoolData[
              tabsActive as keyof schoolProps
            ]?.length && <div className="noData">暂无数据</div>}
            <Tabs
              className={styles["tabs"]}
              activeKey={tabsActive}
              onChange={setTabsActive}
              data={campusData}
              type="card"
              size="small"
            />
            <Radio.Group
              className={styles["radioGroup"]}
              value={
                value && value[1]
                  ? `${value[1] === "0" ? `${value[0]}_${value[1]}` : value[1]}`
                  : undefined
              }
              onChange={(e) => {
                if (onChange) {
                  onChange(
                    e.target.value
                      ? [tabsActive, `${e.target.value}`.includes("_") ? "0" : e.target.value]
                      : [],
                  );
                }
                setShowDrawer(false);
              }}
            >
              {Object.entries(schoolData).map(([key, values]) => (
                <div key={key} style={{ display: `${key}` === tabsActive ? "" : "none" }}>
                  {[
                    ...(showAllCenter ? [{ id: `${tabsActive}_0`, campus_name: "全部" }] : []),
                    ...values,
                  ].map((child) => (
                    <Radio value={`${child.id}`} key={`${child.id}`}>
                      {child.campus_name}
                    </Radio>
                  ))}
                </div>
              ))}
            </Radio.Group>
          </Spin>
        </Drawer>
      </>
    );
  },
);
