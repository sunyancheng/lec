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
exports.SingleCampusDrawer = void 0;
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
var CustomSelectBox_1 = require("./CustomSelectBox");
var classnames_1 = __importDefault(require("classnames"));
var use_request_1 = __importDefault(require("@luban-hooks/use-request"));
var singleCampusDrawer_less_1 = __importDefault(require("./singleCampusDrawer.less"));
exports.SingleCampusDrawer = react_1.memo(function (_a) {
    var _b;
    var _c, _d;
    var onChange = _a.onChange, _e = _a.visible, visible = _e === void 0 ? false : _e, className = _a.className, _f = _a.style, style = _f === void 0 ? {} : _f, drawerClassName = _a.drawerClassName, _g = _a.drawerStyle, drawerStyle = _g === void 0 ? {} : _g, customSelectElement = _a.customSelectElement, _h = _a.disabled, disabled = _h === void 0 ? false : _h, value = _a.value, showAllCenter = _a.showAllCenter, api = _a.api;
    var _j = __read(react_1.useState(false), 2), showDrawer = _j[0], setShowDrawer = _j[1];
    var _k = __read(react_1.useState("1"), 2), tabsActive = _k[0], setTabsActive = _k[1];
    var _l = __read(react_1.useState([]), 2), campusData = _l[0], setCampusData = _l[1];
    var _m = __read(react_1.useState(""), 2), searchValue = _m[0], setSearchValue = _m[1];
    var _o = __read(react_1.useState({}), 2), schoolNames = _o[0], setSchoolNames = _o[1];
    var _p = __read(react_1.useState({}), 2), schoolData = _p[0], setSchoolData = _p[1];
    var baseSchool = react_1.useRef({});
    var campusMap = use_request_1.default(api.fetchCampusApi, {
        initialData: {},
        formatter: function (res) { var _a; return ((_a = res.data) === null || _a === void 0 ? void 0 : _a.data) || {}; },
        onSuccess: function (data) {
            setCampusData(Object.values(data).map(function (child) { return ({
                key: "" + child.id,
                tab: child.name,
            }); }));
        },
    }).data;
    var loading = use_request_1.default(api.fetchSchoolsApi, {
        formatter: function (res) { var _a, _b; return ((_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.school_list) || {}; },
        onSuccess: function (data) {
            var names = {};
            Object.values(data).forEach(function (child) {
                (child || []).forEach(function (school) { return (names["" + school.id] = school.campus_name); });
            });
            baseSchool.current = __assign({}, data);
            setSchoolData(__assign({}, data));
            setSchoolNames(__assign(__assign({}, schoolNames), names));
        },
    }).loading;
    var onSearch = function (v) {
        setSchoolData(v
            ? Object.entries(__assign({}, baseSchool.current)).reduce(function (res, _a) {
                var _b;
                var _c = __read(_a, 2), key = _c[0], values = _c[1];
                return (__assign(__assign({}, res), (_b = {}, _b[key] = values.filter(function (ele) { return ele.campus_name.includes(v); }), _b)));
            }, {})
            : __assign({}, baseSchool.current));
    };
    var afterVisibleChange = function (v) {
        if (v) {
            setSearchValue("");
            onSearch("");
            if (value && value[0])
                setTabsActive("" + value[0]);
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        !customSelectElement ? (react_1.default.createElement(CustomSelectBox_1.CustomSelectBox, { className: className, disabled: disabled, style: __assign({ width: 280 }, style), onClear: function () {
                if (onChange && !disabled)
                    onChange([]);
            }, onOpen: function () { return !disabled && setShowDrawer(true); }, showValue: (value === null || value === void 0 ? void 0 : value.length) === 2
                ? ((_c = campusMap[value[0]]) === null || _c === void 0 ? void 0 : _c.name) + " / " + ("" + value[1] === "0" ? "全部" : schoolNames[value[1]])
                : "" })) : (customSelectElement({ onClick: function () { return setShowDrawer(true); } })),
        react_1.default.createElement(leap_ui_1.Drawer, { title: react_1.default.createElement("div", { className: singleCampusDrawer_less_1.default["drawerTitle"] },
                react_1.default.createElement("div", { className: "name" }, "\u9009\u62E9\u6559\u5B66\u4E2D\u5FC3"),
                react_1.default.createElement(leap_ui_1.Input.Search, { value: searchValue, placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u5B57", onChange: function (e) { return setSearchValue(e.target.value); }, onSearch: onSearch })), closable: false, className: classnames_1.default(singleCampusDrawer_less_1.default["drawer"], (_b = {},
                _b[drawerClassName || ""] = drawerClassName,
                _b)), visible: showDrawer || visible, onClose: function () { return setShowDrawer(false); }, style: drawerStyle, width: 685, afterVisibleChange: afterVisibleChange },
            react_1.default.createElement(leap_ui_1.Spin, { spinning: loading },
                !((_d = schoolData[tabsActive]) === null || _d === void 0 ? void 0 : _d.length) && react_1.default.createElement("div", { className: "noData" }, "\u6682\u65E0\u6570\u636E"),
                react_1.default.createElement(leap_ui_1.Tabs, { className: singleCampusDrawer_less_1.default["tabs"], activeKey: tabsActive, onChange: setTabsActive, data: campusData, type: "card", size: "small" }),
                react_1.default.createElement(leap_ui_1.Radio.Group, { className: singleCampusDrawer_less_1.default["radioGroup"], value: value && value[1]
                        ? "" + (value[1] === "0" ? value[0] + "_" + value[1] : value[1])
                        : undefined, onChange: function (e) {
                        if (onChange) {
                            onChange(e.target.value
                                ? [tabsActive, ("" + e.target.value).includes("_") ? "0" : e.target.value]
                                : []);
                        }
                        setShowDrawer(false);
                    } }, Object.entries(schoolData).map(function (_a) {
                    var _b = __read(_a, 2), key = _b[0], values = _b[1];
                    return (react_1.default.createElement("div", { key: key, style: { display: "" + key === tabsActive ? "" : "none" } }, __spreadArray(__spreadArray([], __read((showAllCenter ? [{ id: tabsActive + "_0", campus_name: "全部" }] : []))), __read(values)).map(function (child) { return (react_1.default.createElement(leap_ui_1.Radio, { value: "" + child.id, key: "" + child.id }, child.campus_name)); })));
                }))))));
});
