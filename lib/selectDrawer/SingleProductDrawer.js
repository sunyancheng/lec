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
exports.SingleProductDrawer = void 0;
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
var leap_ui_1 = require("leap-ui");
var react_1 = __importStar(require("react"));
var singleProductDrawer_less_1 = __importDefault(require("./singleProductDrawer.less"));
var CustomSelectBox_1 = require("./CustomSelectBox");
var classnames_1 = __importDefault(require("classnames"));
var use_request_1 = __importDefault(require("@luban-hooks/use-request"));
var utils_1 = require("./utils");
exports.SingleProductDrawer = react_1.memo(function (_a) {
    var _b;
    var _c, _d;
    var onChange = _a.onChange, _e = _a.visible, visible = _e === void 0 ? false : _e, className = _a.className, _f = _a.style, style = _f === void 0 ? {} : _f, drawerClassName = _a.drawerClassName, _g = _a.drawerStyle, drawerStyle = _g === void 0 ? {} : _g, customSelectElement = _a.customSelectElement, _h = _a.disabled, disabled = _h === void 0 ? false : _h, value = _a.value, getProductList = _a.getProductList, campus_ids = _a.campus_ids, api = _a.api;
    var _j = __read(react_1.useState(false), 2), showDrawer = _j[0], setShowDrawer = _j[1];
    var _k = __read(react_1.useState("1"), 2), tabsActive = _k[0], setTabsActive = _k[1];
    var _l = __read(react_1.useState([]), 2), expandedKeys = _l[0], setExpandedKeys = _l[1];
    var _m = __read(react_1.useState([]), 2), treeData = _m[0], setTreeData = _m[1];
    var _o = __read(react_1.useState(""), 2), searchValue = _o[0], setSearchValue = _o[1];
    var fullKeys = react_1.useRef({});
    var _p = __read(react_1.useState({}), 2), names = _p[0], setNames = _p[1];
    var baseData = react_1.useRef([]);
    var changeTabsActive = function () {
        if (value &&
            value[3] &&
            fullKeys.current &&
            fullKeys.current[value[3]]) {
            setTabsActive("subject_" + fullKeys.current[value[3]][0]);
        }
    };
    var _q = use_request_1.default(api.fetchApi, {
        initialData: {},
        defaultParams: { campus_ids: "-1" },
        formatter: function (res) { var _a; return (_a = res.data) === null || _a === void 0 ? void 0 : _a.data.product_list; },
        onSuccess: function (data) {
            var keys = [];
            var name = {};
            var map = {};
            var products = utils_1.deepLoop(data, function (item) { return !!item.product_id; }, function (cur, _, parent) {
                var value = cur.product_id
                    ? "" + cur.value
                    : "" + ((parent === null || parent === void 0 ? void 0 : parent.key) ? parent.key + "_" : "") + cur.type + "_" + cur.value;
                keys.push(value);
                name[(cur.type || "") + "_" + cur.value] = cur.name || "";
                if (cur.product_id) {
                    fullKeys.current[value] = parent === null || parent === void 0 ? void 0 : parent.key.match(/\d+/g);
                    map["" + cur.product_id] = cur;
                }
                return {
                    type: cur.type,
                    key: value,
                };
            });
            baseData.current = __spreadArray([], __read(products));
            setTreeData(__spreadArray([], __read(products)));
            setNames(name);
            setExpandedKeys(keys);
            if (products.length)
                setTabsActive(products[0].key);
            changeTabsActive();
            if (getProductList && map)
                getProductList(map);
        },
    }), loading = _q.loading, run = _q.run;
    var onSearch = function (v) {
        var copy = JSON.parse(JSON.stringify(baseData.current));
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
            if (campus_ids === null || campus_ids === void 0 ? void 0 : campus_ids.length)
                run({ campus_ids: campus_ids.join(",") });
            setSearchValue("");
            onSearch("");
            changeTabsActive();
        }
    };
    var namePrefix = ["subject_", "product_type_", "product_version_", "_"];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        !customSelectElement ? (react_1.default.createElement(CustomSelectBox_1.CustomSelectBox, { className: className, disabled: disabled, style: __assign({ width: 280 }, style), onClear: function () {
                if (onChange)
                    onChange([]);
            }, onOpen: function () { return setShowDrawer(true); }, showValue: (value === null || value === void 0 ? void 0 : value.length)
                ? value
                    .map(function (ele, i) { return names["" + namePrefix[i] + ele]; })
                    .join(" / ")
                : "" })) : (customSelectElement({ onClick: function () { return setShowDrawer(true); } })),
        react_1.default.createElement(leap_ui_1.Drawer, { title: react_1.default.createElement("div", { className: singleProductDrawer_less_1.default["drawerTitle"] },
                react_1.default.createElement("div", { className: "name" }, "\u9009\u62E9\u4EA7\u54C1"),
                react_1.default.createElement(leap_ui_1.Input.Search, { value: searchValue, placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u5B57", onChange: function (e) { return setSearchValue(e.target.value); }, onSearch: onSearch })), closable: false, className: classnames_1.default(singleProductDrawer_less_1.default["singleDrawer"], (_b = {},
                _b[drawerClassName || ""] = drawerClassName,
                _b)), visible: showDrawer || visible, onClose: function () { return setShowDrawer(false); }, style: drawerStyle, width: 685, afterVisibleChange: afterVisibleChange },
            react_1.default.createElement(leap_ui_1.Spin, { spinning: loading },
                react_1.default.createElement(leap_ui_1.Radio.Group, { value: value ? "" + value[3] : undefined, onChange: function (e) {
                        if (onChange) {
                            var parentKeys = fullKeys.current[e.target.value];
                            if (parentKeys === null || parentKeys === void 0 ? void 0 : parentKeys.length)
                                onChange(__spreadArray(__spreadArray([], __read(parentKeys)), [e.target.value]));
                        }
                        setShowDrawer(false);
                    } },
                    react_1.default.createElement(leap_ui_1.Tabs, { className: singleProductDrawer_less_1.default["tabs"], activeKey: tabsActive, onChange: setTabsActive, type: "card", size: "small", data: treeData.map(function (child) { return ({
                            key: child.key,
                            tab: child.title,
                        }); }) }),
                    !((_d = (_c = treeData.find(function (ele) { return ele.key === tabsActive; })) === null || _c === void 0 ? void 0 : _c.children) === null || _d === void 0 ? void 0 : _d.length) && react_1.default.createElement("div", { className: "noData" }, "\u6682\u65E0\u6570\u636E"),
                    react_1.default.createElement(leap_ui_1.Tree, { className: singleProductDrawer_less_1.default["singleTree"], expandedKeys: expandedKeys }, treeData.map(function (subject) {
                        var _a;
                        return (_a = subject.children) === null || _a === void 0 ? void 0 : _a.map(function (child) {
                            var _a;
                            return (react_1.default.createElement(leap_ui_1.Tree.TreeNode, { style: {
                                    display: subject.key === tabsActive ? "" : "none",
                                }, key: child.key, title: child.title, selectable: false }, (_a = child.children) === null || _a === void 0 ? void 0 : _a.map(function (child) {
                                var _a;
                                return (react_1.default.createElement(leap_ui_1.Tree.TreeNode, { key: child.key, title: child.title, selectable: false }, (_a = child.children) === null || _a === void 0 ? void 0 : _a.map(function (child) { return (react_1.default.createElement(leap_ui_1.Tree.TreeNode, { selectable: false, key: child.key, title: react_1.default.createElement(leap_ui_1.Radio, { value: child.key }, child.title) })); })));
                            })));
                        });
                    })))))));
});
