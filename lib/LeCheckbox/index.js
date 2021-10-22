"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeCheckbox = void 0;
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var LeCheckbox = function (_a) {
    var _b = _a.optionLabelKey, optionLabelKey = _b === void 0 ? "label" : _b, _c = _a.optionValueKey, optionValueKey = _c === void 0 ? "value" : _c, _d = _a.values, values = _d === void 0 ? [] : _d, _e = _a.showAll, showAll = _e === void 0 ? true : _e, allCheckedValue = _a.allCheckedValue, onChange = _a.onChange, value = _a.value, disabled = _a.disabled;
    var prevValue = react_1.useRef([]);
    var allValues = values.map(function (item) { return item[optionValueKey]; });
    var onChange1 = function (value) {
        if (allValues.every(function (v) { return value.includes(v); })) {
            if (prevValue.current.includes(allCheckedValue)) {
                prevValue.current = [];
                return onChange([]);
            }
            prevValue.current = __spreadArray([allCheckedValue], __read(allValues));
            return onChange(__spreadArray([allCheckedValue], __read(allValues)));
        }
        if (value.includes(allCheckedValue)) {
            if (value[value.length - 1] === allCheckedValue) {
                prevValue.current = __spreadArray([allCheckedValue], __read(allValues));
                return onChange(__spreadArray([allCheckedValue], __read(allValues)));
            }
            prevValue.current = value.filter(function (v) { return v !== allCheckedValue; });
            return onChange(__spreadArray([], __read(value.filter(function (v) { return v !== allCheckedValue; }))));
        }
        prevValue.current = value;
        return onChange(value);
    };
    return (react_1.default.createElement(antd_1.Checkbox.Group, { onChange: onChange1, style: { width: "100%" }, value: value, disabled: disabled },
        showAll && (react_1.default.createElement(antd_1.Checkbox, { value: allCheckedValue, key: "ALL_CHECK_KEY" }, "\u5168\u90E8")),
        values.map(function (_a, index) {
            var _b = optionLabelKey, label = _a[_b], _c = optionValueKey, value = _a[_c];
            return (react_1.default.createElement(antd_1.Checkbox, { value: value, key: index }, label));
        })));
};
exports.LeCheckbox = LeCheckbox;
