import { TreeNodeNormal } from "antd/lib/tree/Tree";
import { CascaderOptionType } from "antd/lib/cascader";

export interface ProductItemProps {
  product_id?: number;
  product_name?: string;
  first_stage_id?: number;
  second_stage_id?: number;
  main_teacher?: number;
  assistant_teacher?: number;
  foreign_teacher?: number;
  lesson_duration?: number;
  playtime_duration?: number;
  teach_method?: number;
  max_students?: number;
  name: string;
  value: number;
  type?: string;
  children?: ProductItemProps[];
}

export interface TreeDataRecordProps extends TreeNodeNormal {
  fullName: string;
  children?: TreeDataRecordProps[];
}
export const loop = (
  list: ProductItemProps[],
  parentKey: string,
  cb: (v: string, labe: string) => void,
  getChildName: (value: string) => void,
): TreeDataRecordProps[] => {
  return (list || []).reduce<TreeDataRecordProps[]>((res, child) => {
    const value = `${child.product_id ? "" : `${parentKey ? `${parentKey}_` : ""}${child.type}_`}${
      child.value
    }`;
    if (cb) cb(`${value}`, child.name);
    if (child.type === "product_version" && !child.children?.length) return res;
    let fullName = child.name;

    const children = child.product_id
      ? undefined
      : loop(child.children || [], value, cb, (childFullName) => {
          fullName = `${fullName}_${childFullName}`;
        });

    if (getChildName) getChildName(fullName);
    return [
      ...res,
      {
        ...child,
        key: `${value}`,
        title: child.name,
        children,
        isLeaf: !!child.product_id,
        selectable: child.type === "subject",
        type: child.type,
        fullName,
      },
    ];
  }, []);
};

export interface InputRecordProps {
  name?: string;
  value?: number;
  children?: InputRecordProps[];
  [key: string]: any;
}

export type loopReturnProps = CascaderOptionType | TreeNodeNormal;
export type deepLoopReturnProps = loopReturnProps & { fullName?: string; fullKey?: string };
/**
 * 循环tree结构数据 转为Cascader的oprions
 * @param list InputRecordProps[] 传入的数据
 * @param getIsLeaf (cur: InputRecordProps) => boolean  验证是否为子节点的回调方法
 * @param cb (cur: InputRecordProps,option:InputRecordProps[]) => void|object // 回调方法
 * @param getChildrenFullNameAndKey (fullName: string, fullKey: string) => void, // 获取全名称的方法
 * @returns
 */
export const deepLoop = (
  list: InputRecordProps[],
  getIsLeaf?: (cur: InputRecordProps) => boolean,
  cb?: (
    cur: InputRecordProps,
    option: CascaderOptionType,
    parent?: CascaderOptionType,
  ) => void | object,
  getChildrenFullNameAndKey?: (fullName: string, fullKey: string) => void,
  parent?: CascaderOptionType,
): deepLoopReturnProps[] => {
  if (!list?.length) return [];
  return list.reduce<CascaderOptionType[] | TreeNodeNormal[]>((result, cur) => {
    const isLeaf = getIsLeaf && getIsLeaf(cur);
    let fullName = cur.name || "";
    let fullKey = `${cur.value}`;
    const item = {
      value: `${cur.value}`,
      label: cur.name,
      key: `${cur.value}`,
      title: cur.name,
      isLeaf,
    };
    let callbackObj: object = {};
    if (cb) {
      const res = cb(cur, item, parent);
      if (typeof res === "object") callbackObj = res;
    }
    const children = isLeaf
      ? undefined
      : deepLoop(
          cur.children || [],
          getIsLeaf,
          cb,
          (childFullName, childFullKey) => {
            fullName = `${fullName}_${childFullName}`;
            fullKey = `${fullKey}_${childFullKey}`;
          },
          {
            ...item,
            ...callbackObj,
          },
        );
    if (getChildrenFullNameAndKey) getChildrenFullNameAndKey(fullName, fullKey);
    if (!isLeaf && !children?.length) return result;

    return [...result, { ...item, ...callbackObj, children, fullName, fullKey }];
  }, []);
};
