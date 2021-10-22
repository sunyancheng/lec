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
import { Drawer, Input, Radio, Spin, Tabs, Tree } from "leap-ui";
import React, {
  CSSProperties,
  FunctionComponent,
  memo,
  ReactNode,
  useRef,
  useState,
} from "react";
import styles from "./singleProductDrawer.less";
import { CustomSelectBox } from "./CustomSelectBox";
import classNames from "classnames";
import useRequest from "@luban-hooks/use-request";
import { deepLoop, deepLoopReturnProps, InputRecordProps } from "./utils";
import { TreeNodeNormal } from "antd/lib/tree/Tree";
import { AxiosResponse } from "axios";

interface CustomSelectParams {
  onClick: () => void;
}

export interface SingleProductDrawerProps {
  value?: string[];
  getProductList?: (params: Record<string, InputRecordProps>) => void;
  onChange?: (value: string[]) => void;
  visible?: boolean;
  className?: CSSProperties;
  drawerClassName?: string;
  style?: CSSProperties;
  drawerStyle?: CSSProperties;
  disabled?: boolean;
  customSelectElement?: (params: CustomSelectParams) => ReactNode;
  campus_ids?: string[];
  api: { fetchApi: (params: any) => Promise<AxiosResponse<any>> };
}

export const SingleProductDrawer: FunctionComponent<SingleProductDrawerProps> =
  memo(
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
      getProductList,
      campus_ids,
      api,
    }) => {
      const [showDrawer, setShowDrawer] = useState<boolean>(false);
      const [tabsActive, setTabsActive] = useState<string>("1");
      const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
      const [treeData, setTreeData] = useState<TreeNodeNormal[]>([]);
      const [searchValue, setSearchValue] = useState("");
      const fullKeys = useRef<Record<string, string[]>>({});
      const [names, setNames] = useState<Record<string, string>>({});
      const baseData = useRef<deepLoopReturnProps[]>([]);
      const changeTabsActive = () => {
        if (
          value &&
          value[3] &&
          fullKeys.current &&
          fullKeys.current[value[3]]
        ) {
          setTabsActive(`subject_${fullKeys.current[value[3]][0]}`);
        }
      };

      const { loading, run } = useRequest(api.fetchApi, {
        initialData: {},
        defaultParams: { campus_ids: "-1" },
        formatter: (res) => res.data?.data.product_list,
        onSuccess: (data) => {
          const keys: string[] = [];
          const name: Record<string, string> = {};
          const map: Record<string, InputRecordProps> = {};
          const products = deepLoop(
            data,
            (item) => !!item.product_id,
            (cur, _, parent) => {
              const value = cur.product_id
                ? `${cur.value}`
                : `${parent?.key ? `${parent.key}_` : ""}${cur.type}_${
                    cur.value
                  }`;
              keys.push(value);
              name[`${cur.type || ""}_${cur.value}`] = cur.name || "";
              if (cur.product_id) {
                fullKeys.current[value] = parent?.key.match(/\d+/g);
                map[`${cur.product_id}`] = cur;
              }
              return {
                type: cur.type,
                key: value,
              };
            }
          );
          baseData.current = [...products];
          setTreeData([...products] as TreeNodeNormal[]);
          setNames(name);
          setExpandedKeys(keys);
          if (products.length) setTabsActive(products[0].key);
          changeTabsActive();
          if (getProductList && map) getProductList(map);
        },
      });

      const onSearch = (v: string) => {
        const copy = JSON.parse(JSON.stringify(baseData.current));
        if (!v) {
          setTreeData([...copy]);
          return;
        }
        const keyword = v.toLocaleLowerCase();
        const newData = [...copy].map((child) => {
          return {
            ...child,
            children: child.children?.filter((ele) => {
              if (ele.label.toLocaleLowerCase().includes(keyword)) return true;
              ele.children = [...ele.children].filter((version) => {
                if (version.label.toLocaleLowerCase().includes(keyword))
                  return true;
                version.children = [...version.children].filter((product) =>
                  product.label.toLocaleLowerCase().includes(keyword)
                );
                return !!version.children.length;
              });
              return !!ele.children.length;
            }),
          };
        });
        setTreeData(newData);
      };

      const afterVisibleChange = (v: boolean) => {
        if (v) {
          if (campus_ids?.length) run({ campus_ids: campus_ids.join(",") });
          setSearchValue("");
          onSearch("");
          changeTabsActive();
        }
      };

      const namePrefix = ["subject_", "product_type_", "product_version_", "_"];
      return (
        <>
          {!customSelectElement ? (
            <CustomSelectBox
              className={className}
              disabled={disabled}
              style={{ width: 280, ...style }}
              onClear={() => {
                if (onChange) onChange([]);
              }}
              onOpen={() => setShowDrawer(true)}
              showValue={
                value?.length
                  ? value
                      .map((ele, i) => names[`${namePrefix[i]}${ele}`])
                      .join(" / ")
                  : ""
              }
            />
          ) : (
            customSelectElement({ onClick: () => setShowDrawer(true) })
          )}
          <Drawer
            title={
              <div className={styles["drawerTitle"]}>
                <div className="name">选择产品</div>
                <Input.Search
                  value={searchValue}
                  placeholder="请输入关键字"
                  onChange={(e) => setSearchValue(e.target.value)}
                  onSearch={onSearch}
                />
              </div>
            }
            closable={false}
            className={classNames(styles["singleDrawer"], {
              [drawerClassName || ""]: drawerClassName,
            })}
            visible={showDrawer || visible}
            onClose={() => setShowDrawer(false)}
            style={drawerStyle}
            width={685}
            afterVisibleChange={afterVisibleChange}
          >
            <Spin spinning={loading}>
              <Radio.Group
                value={value ? `${value[3]}` : undefined}
                onChange={(e) => {
                  if (onChange) {
                    const parentKeys = fullKeys.current[e.target.value];
                    if (parentKeys?.length)
                      onChange([...parentKeys, e.target.value]);
                  }
                  setShowDrawer(false);
                }}
              >
                <Tabs
                  className={styles["tabs"]}
                  activeKey={tabsActive}
                  onChange={setTabsActive}
                  type="card"
                  size="small"
                  data={treeData.map((child) => ({
                    key: child.key,
                    tab: child.title,
                  }))}
                />
                {!treeData.find((ele) => ele.key === tabsActive)?.children
                  ?.length && <div className="noData">暂无数据</div>}
                <Tree
                  className={styles["singleTree"]}
                  expandedKeys={expandedKeys}
                >
                  {treeData.map((subject) =>
                    subject.children?.map((child) => (
                      <Tree.TreeNode
                        style={{
                          display: subject.key === tabsActive ? "" : "none",
                        }}
                        key={child.key}
                        title={child.title}
                        selectable={false}
                      >
                        {child.children?.map((child) => (
                          <Tree.TreeNode
                            key={child.key}
                            title={child.title}
                            selectable={false}
                          >
                            {child.children?.map((child) => (
                              <Tree.TreeNode
                                selectable={false}
                                key={child.key}
                                title={
                                  <Radio value={child.key}>{child.title}</Radio>
                                }
                              ></Tree.TreeNode>
                            ))}
                          </Tree.TreeNode>
                        ))}
                      </Tree.TreeNode>
                    ))
                  )}
                </Tree>
              </Radio.Group>
            </Spin>
          </Drawer>
        </>
      );
    }
  );
