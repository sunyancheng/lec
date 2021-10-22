export { REQUEST, REQUEST_MANUAL } from "./request";

// Object 去除空值
export const getPureObject = (
  criteria: { [key: string]: any },
  filter: (criteriaItem: [string, any]) => boolean,
) => {
  return Object.entries(criteria)
    .filter((item) => (filter ? filter(item) : !!item[1]))
    .reduce((p, [key, value]) => ({ ...p, [key]: value }), {});
};

export const recurseTreeDataID = (data) => {
  if (!Array.isArray(data)) return [];
  const iterate = (data, pId = "") => {
    return data.map((item) => {
      return Object.entries(item).reduce((p, [k, v]) => {
        if (k === "children") {
          if (Array.isArray(v) && v.length > 0) {
            v = iterate(v, pId ? pId + ";" + item.value : item.value);
          }
          return { ...p, [k]: v, pId };
        }
        if (k === "name") {
          return { ...p, [k]: v, title: v, pId };
        }
        return { ...p, [k]: v, pId };
      }, {});
    });
  };
  return iterate(data);
};

// 遍历修改 TreeData

export const recurseTreeData = ({
  data,
  titleProp = (k: string) => k && false,
  valueProp = (k: string) => k && false,
  childrenProp = (k: string) => k && false,
}) => {
  const iterate = (data, pNode = {}) => {
    let node = pNode;

    return data.map((item) => {
      return Object.entries(item).reduce((p, [k, v]) => {
        if (titleProp(k)) {
          if (k === "second_stage_sign") {
            node = { ...node, [k]: v };

            return { ...p, [k]: v, title: v, pNode: node };
          }
          return { ...p, [k]: v, title: v };
        }

        if (valueProp(k)) {
          if (k === "product_tree_id") {
            return { ...p, [k]: v, value: v };
          }

          node = Object.keys(pNode).length > 0 ? { ...pNode, [k]: v } : { [k]: v };

          return { ...p, [k]: v, value: Object.values(node).join(";") };
        }

        if (childrenProp(k)) {
          if (Array.isArray(v) && v.length > 0) {
            v = iterate(v, node);
          }

          return { ...p, [k]: v, children: v, pNode };
        }

        if (k === "first_stage_sign") {
          node = { ...node, [k]: v };

          return { ...p, [k]: v, pNode: node };
        }

        return { ...p, [k]: v, pNode };
      }, {});
    });
  };
  return iterate(data);
};

// 根据 advRules, 生成 rules
export const validationGenerator = (field, rules) => {
  return Object.entries(rules).reduce((p, [k, v]) => {
    if (k === "required" && v === true) {
      return [...p, { required: true, message: `${field}不能为空` }];
    }

    if (k === "min") {
      return [
        ...p,

        {
          validator: (_, value, callback) => {
            if (value < v) return callback(`${field}不能小于${v}`);
            callback();
          },
        },
      ];
    }

    if (k === "max") {
      return [
        ...p,

        {
          validator: (_, value, callback) => {
            if (value > v) return callback(`${field}不能大于${v}`);
            callback();
          },
        },
      ];
    }

    if (k === "maxLen") {
      return [
        ...p,

        {
          validator: (_, value, callback) => {
            // 处理下 undefined
            if (value && value.length > v) return callback(`${field}长度不能超过${v}`);
            callback();
          },
        },
      ];
    }

    if (k === "type") {
      if (v === "integer") {
        return [
          ...p,
          {
            validator: (_, value, callback) => {
              if (!/^\d+$/.test(value)) return callback(`${field}必须是整数`);
              callback();
            },
          },
        ];
      }
      return p;
    }
    return p;
  }, []);
};

// rules 和 advRules 合并
export const rulesGenerator = (field, rules = [], advRules = {}) => {
  return Object.keys(advRules).length ? [...rules, ...validationGenerator(field, advRules)] : rules;
};

export const traverse = (array, item, matchKey) => {
  let find = false;
  array.forEach((itm) => {
    if (Array.isArray(itm.items) && itm.items.length > 0) {
      itm.items = itm.items.map((tm) => {
        if (tm[matchKey] === item[matchKey]) {
          find = true;
          return { ...tm, ...item };
        }

        return tm;
      });
    }
  });
  if (!find) array.push(item);
};

export const ObjectArrayMerge = (current, incoming, matchKey = "id") => {
  const a = current.map((item) => {
    if (Array.isArray(item.items)) return { ...item, items: item.items };
    return { ...item };
  });

  incoming.forEach((item) => {
    const index = a.findIndex((itm) => itm[matchKey] === item[matchKey]);

    if (index > -1) {
      a.splice(index, 1, { ...a[index], ...item });
    }

    if (index === -1) {
      traverse(a, item, matchKey);
    }
  });

  return a;
};

// export const UTILS = {
//   REQUEST,
//   REQUEST_MANUAL,
//   ObjectArrayMerge,
//   getPureObject,
// };
