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
exports.LeRadio = void 0;
var react_1 = __importDefault(require("react"));
var leap_ui_1 = require("leap-ui");
var LeRadio = function (_a) {
    var _b = _a.optionLabelKey, optionLabelKey = _b === void 0 ? "label" : _b, _c = _a.optionValueKey, optionValueKey = _c === void 0 ? "value" : _c, _d = _a.values, values = _d === void 0 ? [] : _d, props = __rest(_a, ["optionLabelKey", "optionValueKey", "values"]);
    return (react_1.default.createElement(leap_ui_1.Radio.Group, __assign({ style: { width: "100%" } }, props), values.map(function (_a, index) {
        var _b = optionLabelKey, label = _a[_b], _c = optionValueKey, value = _a[_c];
        return (react_1.default.createElement(leap_ui_1.Radio, { value: value, key: index }, label));
    })));
};
exports.LeRadio = LeRadio;
