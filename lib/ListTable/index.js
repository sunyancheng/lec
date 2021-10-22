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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTable = void 0;
var react_1 = __importStar(require("react"));
var leap_ui_1 = require("leap-ui");
var classnames_1 = __importDefault(require("classnames"));
var style_less_1 = __importDefault(require("./style.less"));
exports.ListTable = react_1.memo(function (_a) {
    var data = _a.data, className = _a.className, _b = _a.tableOptions, tableOptions = _b === void 0 ? {} : _b, columns = _a.columns, onPageChange = _a.onPageChange, singlePage = _a.singlePage;
    var _c = tableOptions.pageOptions, pageOptions = _c === void 0 ? {} : _c, tableProps = __rest(tableOptions, ["pageOptions"]);
    return (react_1.default.createElement(leap_ui_1.Table, __assign({ className: classnames_1.default(className, style_less_1.default.ListTable), columns: columns }, tableProps, { dataSource: singlePage
            ? Array.isArray(data)
                ? data
                : []
            : Array.isArray(data === null || data === void 0 ? void 0 : data.data)
                ? data === null || data === void 0 ? void 0 : data.data
                : [], pagination: singlePage
            ? false
            : __assign(__assign({}, pageOptions), { current: Number((data === null || data === void 0 ? void 0 : data.current_page) || 1), pageSize: Number((data === null || data === void 0 ? void 0 : data.page_size) || (data === null || data === void 0 ? void 0 : data.per_page) || 20), total: Number(data === null || data === void 0 ? void 0 : data.total), onChange: function (page, pageSize) { return onPageChange("" + page, pageSize); } }) })));
});
