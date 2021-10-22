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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDrawer = void 0;
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
var use_request_1 = __importDefault(require("@luban-hooks/use-request"));
var leap_ui_1 = require("leap-ui");
var react_1 = __importStar(require("react"));
var CustomSelectBox_1 = require("./CustomSelectBox");
var classnames_1 = __importDefault(require("classnames"));
var utils_1 = require("./utils");
var productDrawer_less_1 = __importDefault(require("./productDrawer.less"));
exports.ProductDrawer = react_1.memo(function (_a) {
    var _b;
    var _c;
    var onChange = _a.onChange, onClose = _a.onClose, _d = _a.visible, visible = _d === void 0 ? false : _d, value = _a.value, _e = _a.maxTagCount, maxTagCount = _e === void 0 ? 2 : _e, className = _a.className, _f = _a.style, style = _f === void 0 ? {} : _f, drawerClassName = _a.drawerClassName, _g = _a.drawerStyle, drawerStyle = _g === void 0 ? {} : _g, customSelectElement = _a.customSelectElement, _h = _a.campus_ids, campus_ids = _h === void 0 ? "" : _h, _j = _a.disabled, disabled = _j === void 0 ? false : _j, getNameMap = _a.getNameMap, getProductList = _a.getProductList, hideControlBar = _a.hideControlBar, api = _a.api;
    var _k = __read(react_1.useState(false), 2), showDrawer = _k[0], setShowDrawer = _k[1];
    var _l = __read(react_1.useState([]), 2), checkedKeys = _l[0], setCheckedKeys = _l[1];
    var _m = __read(react_1.useState(""), 2), selectedKey = _m[0], setSelectedKey = _m[1];
    var _o = __read(react_1.useState([]), 2), expandedKeys = _o[0], setExpandedKeys = _o[1];
    var _p = __read(react_1.useState({}), 2), namesMap = _p[0], setNamesMap = _p[1];
    var _q = __read(react_1.useState([]), 2), treeData = _q[0], setTreeData = _q[1];
    var baseTreeData = react_1.useRef([]);
    var _r = __read(react_1.useState(""), 2), searchValue = _r[0], setSearchValue = _r[1];
    var _s = use_request_1.default(api.fetchApi, {
        defaultParams: api.params || { campus_ids: "-1" },
        onSuccess: function (res) {
            var _a, _b;
            if ((_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.product_list) === null || _b === void 0 ? void 0 : _b.length) {
                var keys_1 = [];
                var names_1 = {};
                var map_1 = {};
                var data = utils_1.deepLoop(res.data.product_list, function (cur) { return !!cur.product_id; }, function (cur, _, parent) {
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
    return (react_1.default.createElement(react_1.default.Fragment, null,
        !customSelectElement
            ? !hideControlBar && (react_1.default.createElement(CustomSelectBox_1.CustomSelectBox, { disabled: disabled, className: className, style: __assign({ width: 280 }, style), onClear: function () {
                    setCheckedKeys([]);
                    if (onChange)
                        onChange([]);
                }, showValue: (value === null || value === void 0 ? void 0 : value.length) ? (react_1.default.createElement("ul", null,
                    value.slice(0, maxTagCount).map(function (child, i) {
                        return i <= maxTagCount - 1 && (react_1.default.createElement("li", { className: "tag", key: i },
                            react_1.default.createElement("span", null, namesMap[child]),
                            react_1.default.createElement(leap_ui_1.Icon, { type: "close-circle", theme: "filled", onClick: function (e) {
                                    e.stopPropagation();
                                    var newValue = __spreadArray([], __read(value));
                                    newValue.splice(i, 1);
                                    setCheckedKeys(__spreadArray([], __read(newValue)));
                                    if (onChange)
                                        onChange(__spreadArray([], __read(newValue)));
                                } })));
                    }),
                    value.length > maxTagCount && (react_1.default.createElement(leap_ui_1.Tooltip, { overlayClassName: productDrawer_less_1.default["tooltipContent"], title: value
                            .map(function (child) { return namesMap[child]; })
                            .join("；") },
                        react_1.default.createElement("li", { className: "tag" }, "+" + (value.length - maxTagCount) + "..."))))) : undefined, onOpen: function () { return setShowDrawer(true); } }))
            : customSelectElement({ onClick: function () { return setShowDrawer(true); } }),
        react_1.default.createElement(leap_ui_1.Drawer, { closable: false, title: react_1.default.createElement("div", { className: productDrawer_less_1.default["drawerTitle"] },
                react_1.default.createElement("div", { className: "name" }, "\u9009\u62E9\u4EA7\u54C1"),
                react_1.default.createElement(leap_ui_1.Input.Search, { value: searchValue, placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u5B57", onChange: function (e) { return setSearchValue(e.target.value); }, onSearch: onSearch })), className: classnames_1.default("" + productDrawer_less_1.default["drawer"], (_b = {},
                _b[drawerClassName || ""] = drawerClassName,
                _b)), visible: showDrawer || visible, onClose: function () {
                setShowDrawer(false);
                if (onClose)
                    onClose();
            }, style: drawerStyle, width: 685, afterVisibleChange: afterVisibleChange },
            react_1.default.createElement(leap_ui_1.Spin, { spinning: loading },
                !((_c = curSubject === null || curSubject === void 0 ? void 0 : curSubject.children) === null || _c === void 0 ? void 0 : _c.length) && (react_1.default.createElement("div", { className: "noData" }, "\u6682\u65E0\u6570\u636E")),
                react_1.default.createElement(leap_ui_1.Tree, { checkedKeys: checkedKeys, onCheck: function (keys) {
                        setCheckedKeys(keys);
                    }, expandedKeys: expandedKeys, selectedKeys: [selectedKey], onSelect: function (key, e) {
                        if (e.node.props.dataRef.selectable && key.length)
                            setSelectedKey(key[0]);
                    }, className: "" + productDrawer_less_1.default["productTree"], treeData: treeData, checkable: true })),
            react_1.default.createElement("div", { className: productDrawer_less_1.default["drawerFooter"] },
                react_1.default.createElement(leap_ui_1.Button, { type: "primary", onClick: handleOk }, "\u786E\u5B9A"),
                react_1.default.createElement(leap_ui_1.Button, { onClick: function () {
                        setShowDrawer(false);
                        if (onClose)
                            onClose();
                    } }, "\u53D6\u6D88")))));
});
