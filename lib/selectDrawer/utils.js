"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepLoop = exports.loop = void 0;
var loop = function (list, parentKey, cb, getChildName) {
    return (list || []).reduce(function (res, child) {
        var _a;
        var value = "" + (child.product_id ? "" : "" + (parentKey ? parentKey + "_" : "") + child.type + "_") + child.value;
        if (cb)
            cb("" + value, child.name);
        if (child.type === "product_version" && !((_a = child.children) === null || _a === void 0 ? void 0 : _a.length))
            return res;
        var fullName = child.name;
        var children = child.product_id
            ? undefined
            : exports.loop(child.children || [], value, cb, function (childFullName) {
                fullName = fullName + "_" + childFullName;
            });
        if (getChildName)
            getChildName(fullName);
        return __spreadArray(__spreadArray([], __read(res)), [
            __assign(__assign({}, child), { key: "" + value, title: child.name, children: children, isLeaf: !!child.product_id, selectable: child.type === "subject", type: child.type, fullName: fullName }),
        ]);
    }, []);
};
exports.loop = loop;
/**
 * 循环tree结构数据 转为Cascader的oprions
 * @param list InputRecordProps[] 传入的数据
 * @param getIsLeaf (cur: InputRecordProps) => boolean  验证是否为子节点的回调方法
 * @param cb (cur: InputRecordProps,option:InputRecordProps[]) => void|object // 回调方法
 * @param getChildrenFullNameAndKey (fullName: string, fullKey: string) => void, // 获取全名称的方法
 * @returns
 */
var deepLoop = function (list, getIsLeaf, cb, getChildrenFullNameAndKey, parent) {
    if (!(list === null || list === void 0 ? void 0 : list.length))
        return [];
    return list.reduce(function (result, cur) {
        var isLeaf = getIsLeaf && getIsLeaf(cur);
        var fullName = cur.name || "";
        var fullKey = "" + cur.value;
        var item = {
            value: "" + cur.value,
            label: cur.name,
            key: "" + cur.value,
            title: cur.name,
            isLeaf: isLeaf,
        };
        var callbackObj = {};
        if (cb) {
            var res = cb(cur, item, parent);
            if (typeof res === "object")
                callbackObj = res;
        }
        var children = isLeaf
            ? undefined
            : exports.deepLoop(cur.children || [], getIsLeaf, cb, function (childFullName, childFullKey) {
                fullName = fullName + "_" + childFullName;
                fullKey = fullKey + "_" + childFullKey;
            }, __assign(__assign({}, item), callbackObj));
        if (getChildrenFullNameAndKey)
            getChildrenFullNameAndKey(fullName, fullKey);
        if (!isLeaf && !(children === null || children === void 0 ? void 0 : children.length))
            return result;
        return __spreadArray(__spreadArray([], __read(result)), [__assign(__assign(__assign({}, item), callbackObj), { children: children, fullName: fullName, fullKey: fullKey })]);
    }, []);
};
exports.deepLoop = deepLoop;
