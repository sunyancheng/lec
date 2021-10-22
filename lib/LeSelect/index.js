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
exports.LeSelect = void 0;
var react_1 = __importDefault(require("react"));
var leap_ui_1 = require("leap-ui");
var Option = leap_ui_1.Select.Option;
var LeSelect = function (_a) {
    var placeholder = _a.placeholder, _b = _a.optionLabelKey, optionLabelKey = _b === void 0 ? "label" : _b, _c = _a.optionValueKey, optionValueKey = _c === void 0 ? "value" : _c, _d = _a.values, values = _d === void 0 ? [] : _d, showAll = _a.showAll, _e = _a.defaultOptionValue, defaultOptionValue = _e === void 0 ? undefined : _e, _f = _a.defaultOptionLabel, defaultOptionLabel = _f === void 0 ? "全部" : _f, props = __rest(_a, ["placeholder", "optionLabelKey", "optionValueKey", "values", "showAll", "defaultOptionValue", "defaultOptionLabel"]);
    return (react_1.default.createElement(leap_ui_1.Select, __assign({ placeholder: placeholder }, props),
        showAll && (react_1.default.createElement(Option, { key: defaultOptionValue, value: defaultOptionValue }, defaultOptionLabel)),
        values.map(function (_a) {
            var _b = optionLabelKey, label = _a[_b], _c = optionValueKey, value = _a[_c];
            return (react_1.default.createElement(Option, { key: value, value: value }, label));
        })));
};
exports.LeSelect = LeSelect;