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
import React, { memo, useRef, useState, } from "react";
import { CustomSelectBox } from "./CustomSelectBox";
import classNames from "classnames";
import { deepLoop } from "./utils";
import styles from "./productDrawer.less";
export var ProductDrawer = memo(function (_a) {
    var _b;
    var _c;
    var onChange = _a.onChange, onClose = _a.onClose, _d = _a.visible, visible = _d === void 0 ? false : _d, value = _a.value, _e = _a.maxTagCount, maxTagCount = _e === void 0 ? 2 : _e, className = _a.className, _f = _a.style, style = _f === void 0 ? {} : _f, drawerClassName = _a.drawerClassName, _g = _a.drawerStyle, drawerStyle = _g === void 0 ? {} : _g, customSelectElement = _a.customSelectElement, _h = _a.campus_ids, campus_ids = _h === void 0 ? "" : _h, _j = _a.disabled, disabled = _j === void 0 ? false : _j, getNameMap = _a.getNameMap, getProductList = _a.getProductList, hideControlBar = _a.hideControlBar, api = _a.api;
    var _k = __read(useState(false), 2), showDrawer = _k[0], setShowDrawer = _k[1];
    var _l = __read(useState([]), 2), checkedKeys = _l[0], setCheckedKeys = _l[1];
    var _m = __read(useState(""), 2), selectedKey = _m[0], setSelectedKey = _m[1];
    var _o = __read(useState([]), 2), expandedKeys = _o[0], setExpandedKeys = _o[1];
    var _p = __read(useState({}), 2), namesMap = _p[0], setNamesMap = _p[1];
    var _q = __read(useState([]), 2), treeData = _q[0], setTreeData = _q[1];
    var baseTreeData = useRef([]);
    var _r = __read(useState(""), 2), searchValue = _r[0], setSearchValue = _r[1];
    var _s = useRequest(api.fetchApi, {
        defaultParams: api.params || { campus_ids: "-1" },
        onSuccess: function (res) {
            var _a, _b;
            if ((_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.product_list) === null || _b === void 0 ? void 0 : _b.length) {
                var keys_1 = [];
                var names_1 = {};
                var map_1 = {};
                var data = deepLoop(res.data.product_list, function (cur) { return !!cur.product_id; }, function (cur, _, parent) {
                    var value = cur.product_id
                        ? "" + cur.value
                        : "" + ((parent === null || parent === void 0 ? void 0 : parent.key) ? parent.key + "_" : "") + cur.type + "_" + cur.value;
                    keys_1.push(value);
                    names_1[value] = cur.name || "";
                    if (cur.product_id)
                        map_1["" + cur.product_id] = cur;
                    return {
                        selectable: cur.type === "subject",
                        type: cur.type,
                        key: value,
                    };
                });
                baseTreeData.current = __spreadArray([], __read(data));
                setTreeData(__spreadArray([], __read(data)));
                setSelectedKey("subject_" + res.data.product_list[0].value);
                setExpandedKeys(keys_1);
                setNamesMap(names_1);
                if (getProductList && map_1)
                    getProductList(map_1);
                if (getNameMap)
                    getNameMap(names_1);
            }
        },
    }), run = _s.run, loading = _s.loading;
    var handleOk = function () {
        if (onChange)
            onChange(checkedKeys.filter(function (ele) { return !ele.includes("subject"); }));
        setShowDrawer(false);
    };
    var onSearch = function (v) {
        var copy = JSON.parse(JSON.stringify(baseTreeData.current));
        if (!v) {
            setTreeData(__spreadArray([], __read(copy)));
            return;
        }
        var keyword = v.toLocaleLowerCase();
        var newData = __spreadArray([], __read(copy)).map(function (child) {
            var _a;
            return __assign(__assign({}, child), { children: (_a = child.children) === null || _a === void 0 ? void 0 : _a.filter(function (ele) {
                    if (ele.label.toLocaleLowerCase().includes(keyword))
                        return true;
                    ele.children = __spreadArray([], __read(ele.children)).filter(function (version) {
                        if (version.label.toLocaleLowerCase().includes(keyword))
                            return true;
                        version.children = __spreadArray([], __read(version.children)).filter(function (product) {
                            return product.label.toLocaleLowerCase().includes(keyword);
                        });
                        return !!version.children.length;
                    });
                    return !!ele.children.length;
                }) });
        });
        setTreeData(newData);
    };
    var afterVisibleChange = function (v) {
        if (v) {
            setCheckedKeys(value || []);
            setSearchValue("");
            onSearch("");
            if (campus_ids) {
                run({ campus_ids: campus_ids || "-1" });
            }
        }
    };
    var curSubject = treeData.find(function (ele) { return ele.key === selectedKey; });
    return (React.createElement(React.Fragment, null,
        !customSelectElement
            ? !hideControlBar && (React.createElement(CustomSelectBox, { disabled: disabled, className: className, style: __assign({ width: 280 }, style), onClear: function () {
                    setCheckedKeys([]);
                    if (onChange)
                        onChange([]);
                }, showValue: (value === null || value === void 0 ? void 0 : value.length) ? (React.createElement("ul", null,
                    value.slice(0, maxTagCount).map(function (child, i) {
                        return i <= maxTagCount - 1 && (React.createElement("li", { className: "tag", key: i },
                            React.createElement("span", null, namesMap[child]),
                            React.createElement(Icon, { type: "close-circle", theme: "filled", onClick: function (e) {
                                    e.stopPropagation();
                                    var newValue = __spreadArray([], __read(value));
                                    newValue.splice(i, 1);
                                    setCheckedKeys(__spreadArray([], __read(newValue)));
                                    if (onChange)
                                        onChange(__spreadArray([], __read(newValue)));
                                } })));
                    }),
                    value.length > maxTagCount && (React.createElement(Tooltip, { overlayClassName: styles["tooltipContent"], title: value
                            .map(function (child) { return namesMap[child]; })
                            .join("；") },
                        React.createElement("li", { className: "tag" }, "+" + (value.length - maxTagCount) + "..."))))) : undefined, onOpen: function () { return setShowDrawer(true); } }))
            : customSelectElement({ onClick: function () { return setShowDrawer(true); } }),
        React.createElement(Drawer, { closable: false, title: React.createElement("div", { className: styles["drawerTitle"] },
                React.createElement("div", { className: "name" }, "\u9009\u62E9\u4EA7\u54C1"),
                React.createElement(Input.Search, { value: searchValue, placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u5B57", onChange: function (e) { return setSearchValue(e.target.value); }, onSearch: onSearch })), className: classNames("" + styles["drawer"], (_b = {},
                _b[drawerClassName || ""] = drawerClassName,
                _b)), visible: showDrawer || visible, onClose: function () {
                setShowDrawer(false);
                if (onClose)
                    onClose();
            }, style: drawerStyle, width: 685, afterVisibleChange: afterVisibleChange },
            React.createElement(Spin, { spinning: loading },
                !((_c = curSubject === null || curSubject === void 0 ? void 0 : curSubject.children) === null || _c === void 0 ? void 0 : _c.length) && (React.createElement("div", { className: "noData" }, "\u6682\u65E0\u6570\u636E")),
                React.createElement(Tree, { checkedKeys: checkedKeys, onCheck: function (keys) {
                        setCheckedKeys(keys);
                    }, expandedKeys: expandedKeys, selectedKeys: [selectedKey], onSelect: function (key, e) {
                        if (e.node.props.dataRef.selectable && key.length)
                            setSelectedKey(key[0]);
                    }, className: "" + styles["productTree"], treeData: treeData, checkable: true })),
            React.createElement("div", { className: styles["drawerFooter"] },
                React.createElement(Button, { type: "primary", onClick: handleOk }, "\u786E\u5B9A"),
                React.createElement(Button, { onClick: function () {
                        setShowDrawer(false);
                        if (onClose)
                            onClose();
                    } }, "\u53D6\u6D88")))));
});
