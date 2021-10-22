/**
 * 选择产品
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
 * <ProductDrawer value={productIds} onChange={setProductIds} />
 * 
 * e.g. （一）自定义选择节点
 * <ProductDrawer
      value={productIds}
      onChange={setProductIds}
      customSelectElement={({ onClick }) => <Button onClick={onClick}>show</Button>}
   />
 */
import useRequest from "@luban-hooks/use-request";
import { Button, Drawer, Icon, Input, Spin, Tooltip, Tree } from "leap-ui";
import React, {
  CSSProperties,
  FunctionComponent,
  memo,
  ReactNode,
  useRef,
  useState,
} from "react";
import { CustomSelectBox } from "./CustomSelectBox";
import classNames from "classnames";
import { TreeNodeNormal } from "antd/lib/tree/Tree";
import { AxiosResponse } from "axios";
import { deepLoop, deepLoopReturnProps, InputRecordProps } from "./utils";
import styles from "./productDrawer.less";

interface CustomSelectParams {
  onClick: () => void;
}

export interface ProductDrawerProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  onClose?: () => void;
  visible?: boolean;
  maxTagCount?: number;
  className?: CSSProperties;
  drawerClassName?: string;
  style?: CSSProperties;
  drawerStyle?: CSSProperties;
  customSelectElement?: (params: CustomSelectParams) => ReactNode;
  manual?: boolean;
  disabled?: boolean;
  campus_ids?: string;
  getNameMap?: (data: Record<string, string>) => void;
  getProductList?: (params: Record<string, InputRecordProps>) => void;
  hideControlBar?: boolean;
  api: {
    fetchApi: (params: any) => Promise<AxiosResponse<any>>;
    params?: any;
  };
}

export const ProductDrawer: FunctionComponent<ProductDrawerProps> = memo(
  ({
    onChange,
    onClose,
    visible = false,
    value,
    maxTagCount = 2,
    className,
    style = {},
    drawerClassName,
    drawerStyle = {},
    customSelectElement,
    campus_ids = "",
    disabled = false,
    getNameMap,
    getProductList,
    hideControlBar,
    api,
  }) => {
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
    const [selectedKey, setSelectedKey] = useState<string>("");
    const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
    const [namesMap, setNamesMap] = useState<Record<string, string>>({});
    const [treeData, setTreeData] = useState<deepLoopReturnProps[]>([]);
    const baseTreeData = useRef<deepLoopReturnProps[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const { run, loading } = useRequest(api.fetchApi, {
      defaultParams: api.params || { campus_ids: "-1" },
      onSuccess: (res) => {
        if (res.data?.product_list?.length) {
          const keys: string[] = [];
          const names: Record<string, string> = {};
          const map: Record<string, InputRecordProps> = {};
          const data = deepLoop(
            res.data.product_list,
            (cur) => !!cur.product_id,
            (cur, _, parent) => {
              const value = cur.product_id
                ? `${cur.value}`
                : `${parent?.key ? `${parent.key}_` : ""}${cur.type}_${
                    cur.value
                  }`;
              keys.push(value);
              names[value] = cur.name || "";
              if (cur.product_id) map[`${cur.product_id}`] = cur;
              return {
                selectable: cur.type === "subject",
                type: cur.type,
                key: value,
              };
            }
          );

          baseTreeData.current = [...(data as deepLoopReturnProps[])];
          setTreeData([...(data as deepLoopReturnProps[])]);
          setSelectedKey(`subject_${res.data.product_list[0].value}`);
          setExpandedKeys(keys);
          setNamesMap(names);

          if (getProductList && map) getProductList(map);
          if (getNameMap) getNameMap(names);
        }
      },
    });

    const handleOk = () => {
      if (onChange)
        onChange(checkedKeys.filter((ele) => !ele.includes("subject")));
      setShowDrawer(false);
    };

    const onSearch = (v: string) => {
      const copy = JSON.parse(JSON.stringify(baseTreeData.current));
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
        setCheckedKeys(value || []);
        setSearchValue("");
        onSearch("");
        if (campus_ids) {
          run({ campus_ids: campus_ids || "-1" });
        }
      }
    };
    const curSubject = treeData.find((ele) => ele.key === selectedKey);

    return (
      <>
        {!customSelectElement
          ? !hideControlBar && (
              <CustomSelectBox
                disabled={disabled}
                className={className}
                style={{ width: 280, ...style }}
                onClear={() => {
                  setCheckedKeys([]);
                  if (onChange) onChange([]);
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
                                  if (onChange) onChange([...newValue]);
                                }}
                              />
                            </li>
                          )
                      )}
                      {value.length > maxTagCount && (
                        <Tooltip
                          overlayClassName={styles["tooltipContent"]}
                          title={value
                            .map((child) => namesMap[child])
                            .join("；")}
                        >
                          <li className="tag">{`+${
                            value.length - maxTagCount
                          }...`}</li>
                        </Tooltip>
                      )}
                    </ul>
                  ) : undefined
                }
                onOpen={() => setShowDrawer(true)}
              />
            )
          : customSelectElement({ onClick: () => setShowDrawer(true) })}
        <Drawer
          closable={false}
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
          className={classNames(`${styles["drawer"]}`, {
            [drawerClassName || ""]: drawerClassName,
          })}
          visible={showDrawer || visible}
          onClose={() => {
            setShowDrawer(false);
            if (onClose) onClose();
          }}
          style={drawerStyle}
          width={685}
          afterVisibleChange={afterVisibleChange}
        >
          <Spin spinning={loading}>
            {!curSubject?.children?.length && (
              <div className="noData">暂无数据</div>
            )}
            <Tree
              checkedKeys={checkedKeys}
              onCheck={(keys) => {
                setCheckedKeys(keys as string[]);
              }}
              expandedKeys={expandedKeys}
              selectedKeys={[selectedKey]}
              onSelect={(key, e) => {
                if (e.node.props.dataRef.selectable && key.length)
                  setSelectedKey(key[0]);
              }}
              className={`${styles["productTree"]}`}
              treeData={treeData as TreeNodeNormal[]}
              checkable
            />
          </Spin>
          <div className={styles["drawerFooter"]}>
            <Button type="primary" onClick={handleOk}>
              确定
            </Button>
            <Button
              onClick={() => {
                setShowDrawer(false);
                if (onClose) onClose();
              }}
            >
              取消
            </Button>
          </div>
        </Drawer>
      </>
    );
  }
);
