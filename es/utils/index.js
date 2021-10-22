var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
export { REQUEST, REQUEST_MANUAL } from "./request";
// Object 去除空值
export var getPureObject = function (criteria, filter) {
    return Object.entries(criteria)
        .filter(function (item) { return (filter ? filter(item) : !!item[1]); })
        .reduce(function (p, _a) {
        var _b;
        var _c = __read(_a, 2), key = _c[0], value = _c[1];
        return (__assign(__assign({}, p), (_b = {}, _b[key] = value, _b)));
    }, {});
};
export var recurseTreeDataID = function (data) {
    if (!Array.isArray(data))
        return [];
    var iterate = function (data, pId) {
        if (pId === void 0) { pId = ""; }
        return data.map(function (item) {
            return Object.entries(item).reduce(function (p, _a) {
                var _b, _c, _d;
                var _e = __read(_a, 2), k = _e[0], v = _e[1];
                if (k === "children") {
                    if (Array.isArray(v) && v.length > 0) {
                        v = iterate(v, pId ? pId + ";" + item.value : item.value);
                    }
                    return __assign(__assign({}, p), (_b = {}, _b[k] = v, _b.pId = pId, _b));
                }
                if (k === "name") {
                    return __assign(__assign({}, p), (_c = {}, _c[k] = v, _c.title = v, _c.pId = pId, _c));
                }
                return __assign(__assign({}, p), (_d = {}, _d[k] = v, _d.pId = pId, _d));
            }, {});
        });
    };
    return iterate(data);
};
// 遍历修改 TreeData
export var recurseTreeData = function (_a) {
    var data = _a.data, _b = _a.titleProp, titleProp = _b === void 0 ? function (k) { return k && false; } : _b, _c = _a.valueProp, valueProp = _c === void 0 ? function (k) { return k && false; } : _c, _d = _a.childrenProp, childrenProp = _d === void 0 ? function (k) { return k && false; } : _d;
    var iterate = function (data, pNode) {
        if (pNode === void 0) { pNode = {}; }
        var node = pNode;
        return data.map(function (item) {
            return Object.entries(item).reduce(function (p, _a) {
                var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                var _o = __read(_a, 2), k = _o[0], v = _o[1];
                if (titleProp(k)) {
                    if (k === "second_stage_sign") {
                        node = __assign(__assign({}, node), (_b = {}, _b[k] = v, _b));
                        return __assign(__assign({}, p), (_c = {}, _c[k] = v, _c.title = v, _c.pNode = node, _c));
                    }
                    return __assign(__assign({}, p), (_d = {}, _d[k] = v, _d.title = v, _d));
                }
                if (valueProp(k)) {
                    if (k === "product_tree_id") {
                        return __assign(__assign({}, p), (_e = {}, _e[k] = v, _e.value = v, _e));
                    }
                    node = Object.keys(pNode).length > 0 ? __assign(__assign({}, pNode), (_f = {}, _f[k] = v, _f)) : (_g = {}, _g[k] = v, _g);
                    return __assign(__assign({}, p), (_h = {}, _h[k] = v, _h.value = Object.values(node).join(";"), _h));
                }
                if (childrenProp(k)) {
                    if (Array.isArray(v) && v.length > 0) {
                        v = iterate(v, node);
                    }
                    return __assign(__assign({}, p), (_j = {}, _j[k] = v, _j.children = v, _j.pNode = pNode, _j));
                }
                if (k === "first_stage_sign") {
                    node = __assign(__assign({}, node), (_k = {}, _k[k] = v, _k));
                    return __assign(__assign({}, p), (_l = {}, _l[k] = v, _l.pNode = node, _l));
                }
                return __assign(__assign({}, p), (_m = {}, _m[k] = v, _m.pNode = pNode, _m));
            }, {});
        });
    };
    return iterate(data);
};
// 根据 advRules, 生成 rules
export var validationGenerator = function (field, rules) {
    return Object.entries(rules).reduce(function (p, _a) {
        var _b = __read(_a, 2), k = _b[0], v = _b[1];
        if (k === "required" && v === true) {
            return __spreadArray(__spreadArray([], __read(p)), [{ required: true, message: field + "\u4E0D\u80FD\u4E3A\u7A7A" }]);
        }
        if (k === "min") {
            return __spreadArray(__spreadArray([], __read(p)), [
                {
                    validator: function (_, value, callback) {
                        if (value < v)
                            return callback(field + "\u4E0D\u80FD\u5C0F\u4E8E" + v);
                        callback();
                    },
                },
            ]);
        }
        if (k === "max") {
            return __spreadArray(__spreadArray([], __read(p)), [
                {
                    validator: function (_, value, callback) {
                        if (value > v)
                            return callback(field + "\u4E0D\u80FD\u5927\u4E8E" + v);
                        callback();
                    },
                },
            ]);
        }
        if (k === "maxLen") {
            return __spreadArray(__spreadArray([], __read(p)), [
                {
                    validator: function (_, value, callback) {
                        // 处理下 undefined
                        if (value && value.length > v)
                            return callback(field + "\u957F\u5EA6\u4E0D\u80FD\u8D85\u8FC7" + v);
                        callback();
                    },
                },
            ]);
        }
        if (k === "type") {
            if (v === "integer") {
                return __spreadArray(__spreadArray([], __read(p)), [
                    {
                        validator: function (_, value, callback) {
                            if (!/^\d+$/.test(value))
                                return callback(field + "\u5FC5\u987B\u662F\u6574\u6570");
                            callback();
                        },
                    },
                ]);
            }
            return p;
        }
        return p;
    }, []);
};
// rules 和 advRules 合并
export var rulesGenerator = function (field, rules, advRules) {
    if (rules === void 0) { rules = []; }
    if (advRules === void 0) { advRules = {}; }
    return Object.keys(advRules).length ? __spreadArray(__spreadArray([], __read(rules)), __read(validationGenerator(field, advRules))) : rules;
};
export var traverse = function (array, item, matchKey) {
    var find = false;
    array.forEach(function (itm) {
        if (Array.isArray(itm.items) && itm.items.length > 0) {
            itm.items = itm.items.map(function (tm) {
                if (tm[matchKey] === item[matchKey]) {
                    find = true;
                    return __assign(__assign({}, tm), item);
                }
                return tm;
            });
        }
    });
    if (!find)
        array.push(item);
};
export var ObjectArrayMerge = function (current, incoming, matchKey) {
    if (matchKey === void 0) { matchKey = "id"; }
    var a = current.map(function (item) {
        if (Array.isArray(item.items))
            return __assign(__assign({}, item), { items: item.items });
        return __assign({}, item);
    });
    incoming.forEach(function (item) {
        var index = a.findIndex(function (itm) { return itm[matchKey] === item[matchKey]; });
        if (index > -1) {
            a.splice(index, 1, __assign(__assign({}, a[index]), item));
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
