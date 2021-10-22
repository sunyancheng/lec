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
import { Button, Drawer, Icon, Input, Spin, Tooltip, Tree } from "leap-ui";
import React, {
  CSSProperties,
  FunctionComponent,
  memo,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./campusDrawer.less";
import { CustomSelectBox } from "./CustomSelectBox";
import classNames from "classnames";
import { TreeNodeNormal } from "antd/lib/tree/Tree";
import { AxiosResponse } from "axios";

interface CustomSelectParams {
  onClick: () => void;
}

export interface CampusDrawerProps {
  value?: string[];
  onChange?: (value: string[], campusIds: string[]) => void;
  onClose?: () => void;
  visible?: boolean;
  maxTagCount?: number;
  className?: CSSProperties;
  drawerClassName?: string;
  style?: CSSProperties;
  drawerStyle?: CSSProperties;
  disabled?: boolean;
  single?: boolean;
  customSelectElement?: (params: CustomSelectParams) => ReactNode;
  hideControlBar?: boolean;
  api: {
    fetchCampusApi: (params: any) => Promise<AxiosResponse<any>>;
    fetchSchoolsApi: (params: any) => Promise<AxiosResponse<any>>;
  }
}

export const CampusDrawer: FunctionComponent<CampusDrawerProps> = memo(
  ({
    onChange,
    visible = false,
    value,
    maxTagCount = 2,
    className,
    style = {},
    drawerClassName,
    drawerStyle = {},
    customSelectElement,
    disabled = false,
    single = false,
    onClose,
    hideControlBar,
    api
  }) => {
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
    const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
    const [namesMap, setNamesMap] = useState<Record<string, string>>({});
    const [treeData, setTreeData] = useState<TreeNodeNormal[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const baseData = useRef<TreeNodeNormal[]>([]);
    const campusAndSchool = useRef<Record<string, string>>({});
    const [searchValue, setSearchValue] = useState("");

    const init = async () => {
      setLoading(true);
      const [campusRes, schoolRes] = await Promise.all([
        api.fetchCampusApi(),
        api.fetchSchoolsApi(),
      ]);
      setLoading(false);
      const keys: string[] = ["0"];
      const names: Record<string, string> = {};

      const data: TreeNodeNormal[] = Object.values(campusRes.data?.data || {}).map((child) => {
        const value = `campus_${child.id}`;
        keys.push(value);
        names[value] = child.name;
        const children = (
          (schoolRes.data.data?.school_list || {})[`${child.id}`] || []
        ).map((center) => {
          const centerValue = `${center.id}`;
          keys.push(centerValue);
          names[centerValue] = center.campus_name;
          campusAndSchool.current[centerValue] = `${center.city_id}`;
          return {
            pId: value,
            title: center.campus_name,
            key: centerValue,
            value: centerValue,
            isLeaf: true,
            selectable: false,
          };
        });
        return {
          title: child.name,
          key: value,
          value,
          pId: "0",
          isLeaf: false,
          children,
        };
      });
      baseData.current = [...data];
      setTreeData([...data]);
      setExpandedKeys(keys);
      setNamesMap(names);
    };

    useEffect(() => {
      init();
    }, []);
    // campusAndSchool.current;
    const handleOnChang = (checkedKeys: string[]) => {
      if (onChange) {
        const schoolIds = checkedKeys.filter((ele) => !ele.includes("campus_") && ele !== "0");
        const campusIds = [...new Set(schoolIds.map((child) => campusAndSchool.current[child]))];
        onChange(schoolIds, campusIds);
      }
    };
    const handleOk = () => {
      if (onChange) handleOnChang(checkedKeys);
      setShowDrawer(false);
    };

    const onSearch = (v: string) => {
      const newData = baseData.current.reduce<TreeNodeNormal[]>((result, cur) => {
        if (cur.title?.toString().includes(v)) return [...result, cur];
        const children = cur.children?.filter((ele) => ele.title?.toString().includes(v));
        if (children?.length) return [...result, { ...cur, children }];
        return result;
      }, []);
      setTreeData([...newData]);
    };

    const afterVisibleChange = (v: boolean) => {
      if (v) {
        setCheckedKeys(value || []);
        setSearchValue("");
        onSearch("");
      }
    };
    return (
      <>
        {!customSelectElement
          ? !hideControlBar && (
              <CustomSelectBox
                className={className}
                disabled={disabled}
                style={{ width: 280, ...style }}
                onClear={() => {
                  setCheckedKeys([]);
                  if (onChange) onChange([], []);
                }}
                showValue={
                  value?.length ? (
                    <ul>
                      {value.slice(0, maxTagCount).map(
                        (child, i) =>
                          i <= maxTagCount - 1 && (
                            <li className="tag" key={i}>
                              <span>{namesMap[child]}</span>
                              <Icon
                                type="close-circle"
                                theme="filled"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const newValue = [...value];
                                  newValue.splice(i, 1);
                                  setCheckedKeys([...newValue]);
                                  if (onChange) handleOnChang([...newValue]);
                                }}
                              />
                            </li>
                          ),
                      )}
                      {value.length > maxTagCount && (
                        <Tooltip
                          overlayClassName={styles["tooltipContent"]}
                          title={value.map((child) => namesMap[child]).join("；")}
                        >
                          <li className="tag">{`+${value.length - maxTagCount}...`}</li>
                        </Tooltip>
                      )}
                    </ul>
                  ) : (
                    undefined
                  )
                }
                onOpen={() => setShowDrawer(true)}
              />
            )
          : customSelectElement({ onClick: () => setShowDrawer(true) })}
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
          onClose={() => {
            if (onClose) onClose();
            setShowDrawer(false);
          }}
          style={drawerStyle}
          width={685}
          afterVisibleChange={afterVisibleChange}
        >
          <Spin spinning={loading}>
            {!treeData?.length && <div className="noData">暂无数据</div>}
            <Tree
              checkedKeys={checkedKeys}
              onCheck={(keys) => {
                setCheckedKeys(keys as string[]);
              }}
              expandedKeys={expandedKeys}
              selectedKeys={["0"]}
              className={`${styles["campusTree"]}`}
              treeData={[{ title: "全部", key: "0", isLeaf: false, children: treeData }]}
              checkable={!single}
            />
          </Spin>
          <div className={styles["drawerFooter"]}>
            <Button type="primary" onClick={handleOk}>
              确定
            </Button>
            <Button
              onClick={() => {
                if (onClose) onClose();
                setShowDrawer(false);
              }}
            >
              取消
            </Button>
          </div>
        </Drawer>
      </>
    );
  },
);
