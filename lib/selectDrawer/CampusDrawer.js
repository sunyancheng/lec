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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.CampusDrawer = void 0;
/**
 * ??????????????????
 * value?: string[];
 * onChange: (value: string[]) => void;
 * visible?: boolean;
 * maxTagCount?: number;
 * className?: CSSProperties;
 * drawerClassName?: string;
 * style?: CSSProperties;
 * drawerStyle?: CSSProperties;
 * customSelectElement?: (params: CustomSelectParams) => ReactNode; // ?????????????????????
 *
 * e.g. ?????????
 * <CampusDrawer value={campusIds} onChange={setCampusIds} />
 *
 * e.g. ??????????????????????????????
 * <CampusDrawer
      value={campusIds}
      onChange={setCampusIds}
      customSelectElement={({ onClick }) => <Button onClick={onClick}>show</Button>}
   />
 */
var leap_ui_1 = require("leap-ui");
var react_1 = __importStar(require("react"));
var campusDrawer_less_1 = __importDefault(require("./campusDrawer.less"));
var CustomSelectBox_1 = require("./CustomSelectBox");
var classnames_1 = __importDefault(require("classnames"));
exports.CampusDrawer = react_1.memo(function (_a) {
    var _b;
    var onChange = _a.onChange, _c = _a.visible, visible = _c === void 0 ? false : _c, value = _a.value, _d = _a.maxTagCount, maxTagCount = _d === void 0 ? 2 : _d, className = _a.className, _e = _a.style, style = _e === void 0 ? {} : _e, drawerClassName = _a.drawerClassName, _f = _a.drawerStyle, drawerStyle = _f === void 0 ? {} : _f, customSelectElement = _a.customSelectElement, _g = _a.disabled, disabled = _g === void 0 ? false : _g, _h = _a.single, single = _h === void 0 ? false : _h, onClose = _a.onClose, hideControlBar = _a.hideControlBar, api = _a.api;
    var _j = __read(react_1.useState(false), 2), showDrawer = _j[0], setShowDrawer = _j[1];
    var _k = __read(react_1.useState([]), 2), checkedKeys = _k[0], setCheckedKeys = _k[1];
    var _l = __read(react_1.useState([]), 2), expandedKeys = _l[0], setExpandedKeys = _l[1];
    var _m = __read(react_1.useState({}), 2), namesMap = _m[0], setNamesMap = _m[1];
    var _o = __read(react_1.useState([]), 2), treeData = _o[0], setTreeData = _o[1];
    var _p = __read(react_1.useState(false), 2), loading = _p[0], setLoading = _p[1];
    var baseData = react_1.useRef([]);
    var campusAndSchool = react_1.useRef({});
    var _q = __read(react_1.useState(""), 2), searchValue = _q[0], setSearchValue = _q[1];
    var init = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, campusRes, schoolRes, keys, names, data;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    setLoading(true);
                    return [4 /*yield*/, Promise.all([
                            api.fetchCampusApi(),
                            api.fetchSchoolsApi(),
                        ])];
                case 1:
                    _a = __read.apply(void 0, [_c.sent(), 2]), campusRes = _a[0], schoolRes = _a[1];
                    setLoading(false);
                    keys = ["0"];
                    names = {};
                    data = Object.values(((_b = campusRes.data) === null || _b === void 0 ? void 0 : _b.data) || {}).map(function (child) {
                        var _a;
                        var value = "campus_" + child.id;
                        keys.push(value);
                        names[value] = child.name;
                        var children = ((((_a = schoolRes.data.data) === null || _a === void 0 ? void 0 : _a.school_list) || {})["" + child.id] || []).map(function (center) {
                            var centerValue = "" + center.id;
                            keys.push(centerValue);
                            names[centerValue] = center.campus_name;
                            campusAndSchool.current[centerValue] = "" + center.city_id;
                            return {
                                pId: value,
                                title: center.campus_name,
                                key: centerValue,
                                value: centerValue,
                                isLeaf: true,
                                selectable: false,
                            };
                        });
                        return {
                            title: child.name,
                            key: value,
                            value: value,
                            pId: "0",
                            isLeaf: false,
                            children: children,
                        };
                    });
                    baseData.current = __spreadArray([], __read(data));
                    setTreeData(__spreadArray([], __read(data)));
                    setExpandedKeys(keys);
                    setNamesMap(names);
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        init();
    }, []);
    // campusAndSchool.current;
    var handleOnChang = function (checkedKeys) {
        if (onChange) {
            var schoolIds = checkedKeys.filter(function (ele) { return !ele.includes("campus_") && ele !== "0"; });
            var campusIds = __spreadArray([], __read(new Set(schoolIds.map(function (child) { return campusAndSchool.current[child]; }))));
            onChange(schoolIds, campusIds);
        }
    };
    var handleOk = function () {
        if (onChange)
            handleOnChang(checkedKeys);
        setShowDrawer(false);
    };
    var onSearch = function (v) {
        var newData = baseData.current.reduce(function (result, cur) {
            var _a, _b;
            if ((_a = cur.title) === null || _a === void 0 ? void 0 : _a.toString().includes(v))
                return __spreadArray(__spreadArray([], __read(result)), [cur]);
            var children = (_b = cur.children) === null || _b === void 0 ? void 0 : _b.filter(function (ele) { var _a; return (_a = ele.title) === null || _a === void 0 ? void 0 : _a.toString().includes(v); });
            if (children === null || children === void 0 ? void 0 : children.length)
                return __spreadArray(__spreadArray([], __read(result)), [__assign(__assign({}, cur), { children: children })]);
            return result;
        }, []);
        setTreeData(__spreadArray([], __read(newData)));
    };
    var afterVisibleChange = function (v) {
        if (v) {
            setCheckedKeys(value || []);
            setSearchValue("");
            onSearch("");
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        !customSelectElement
            ? !hideControlBar && (react_1.default.createElement(CustomSelectBox_1.CustomSelectBox, { className: className, disabled: disabled, style: __assign({ width: 280 }, style), onClear: function () {
                    setCheckedKeys([]);
                    if (onChange)
                        onChange([], []);
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
                                        handleOnChang(__spreadArray([], __read(newValue)));
                                } })));
                    }),
                    value.length > maxTagCount && (react_1.default.createElement(leap_ui_1.Tooltip, { overlayClassName: campusDrawer_less_1.default["tooltipContent"], title: value.map(function (child) { return namesMap[child]; }).join("???") },
                        react_1.default.createElement("li", { className: "tag" }, "+" + (value.length - maxTagCount) + "..."))))) : (undefined), onOpen: function () { return setShowDrawer(true); } }))
            : customSelectElement({ onClick: function () { return setShowDrawer(true); } }),
        react_1.default.createElement(leap_ui_1.Drawer, { title: react_1.default.createElement("div", { className: campusDrawer_less_1.default["drawerTitle"] },
                react_1.default.createElement("div", { className: "name" }, "\u9009\u62E9\u6559\u5B66\u4E2D\u5FC3"),
                react_1.default.createElement(leap_ui_1.Input.Search, { value: searchValue, placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u5B57", onChange: function (e) { return setSearchValue(e.target.value); }, onSearch: onSearch })), closable: false, className: classnames_1.default(campusDrawer_less_1.default["drawer"], (_b = {},
                _b[drawerClassName || ""] = drawerClassName,
                _b)), visible: showDrawer || visible, onClose: function () {
                if (onClose)
                    onClose();
                setShowDrawer(false);
            }, style: drawerStyle, width: 685, afterVisibleChange: afterVisibleChange },
            react_1.default.createElement(leap_ui_1.Spin, { spinning: loading },
                !(treeData === null || treeData === void 0 ? void 0 : treeData.length) && react_1.default.createElement("div", { className: "noData" }, "\u6682\u65E0\u6570\u636E"),
                react_1.default.createElement(leap_ui_1.Tree, { checkedKeys: checkedKeys, onCheck: function (keys) {
                        setCheckedKeys(keys);
                    }, expandedKeys: expandedKeys, selectedKeys: ["0"], className: "" + campusDrawer_less_1.default["campusTree"], treeData: [{ title: "??????", key: "0", isLeaf: false, children: treeData }], checkable: !single })),
            react_1.default.createElement("div", { className: campusDrawer_less_1.default["drawerFooter"] },
                react_1.default.createElement(leap_ui_1.Button, { type: "primary", onClick: handleOk }, "\u786E\u5B9A"),
                react_1.default.createElement(leap_ui_1.Button, { onClick: function () {
                        if (onClose)
                            onClose();
                        setShowDrawer(false);
                    } }, "\u53D6\u6D88")))));
});
