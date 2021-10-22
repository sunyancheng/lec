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
exports.FilterGroup = void 0;
var react_1 = __importStar(require("react"));
var leap_ui_1 = require("leap-ui");
var utils_1 = require("../utils");
var style_less_1 = __importDefault(require("./style.less"));
var Option = leap_ui_1.Select.Option;
var SimpleDatePicker = function (_a) {
    var label = _a.label, placeholder = _a.placeholder, id = _a.id, getFieldDecorator = _a.getFieldDecorator;
    return (react_1.default.createElement(leap_ui_1.Form.Item, { label: label }, getFieldDecorator(id)(react_1.default.createElement(leap_ui_1.DatePicker, { placeholder: placeholder }))));
};
var MultipleSelect = function (_a) {
    var label = _a.label, placeholder = _a.placeholder, id = _a.id, _b = _a.optionLabelKey, optionLabelKey = _b === void 0 ? "label" : _b, _c = _a.optionValueKey, optionValueKey = _c === void 0 ? "value" : _c, _d = _a.maxTagCount, maxTagCount = _d === void 0 ? 1 : _d, _e = _a.values, values = _e === void 0 ? [] : _e, getFieldDecorator = _a.getFieldDecorator;
    return (react_1.default.createElement(leap_ui_1.Form.Item, { label: label }, getFieldDecorator(id)(react_1.default.createElement(leap_ui_1.Select, { placeholder: placeholder, mode: "multiple", maxTagCount: maxTagCount }, values.map(function (_a) {
        var _b = optionLabelKey, label = _a[_b], _c = optionValueKey, value = _a[_c];
        return (react_1.default.createElement(Option, { key: value, value: value }, label));
    })))));
};
var SimpleSelect = function (_a) {
    var label = _a.label, placeholder = _a.placeholder, id = _a.id, _b = _a.optionLabelKey, optionLabelKey = _b === void 0 ? "label" : _b, _c = _a.optionValueKey, optionValueKey = _c === void 0 ? "value" : _c, _d = _a.values, values = _d === void 0 ? [] : _d, getFieldDecorator = _a.getFieldDecorator;
    return (react_1.default.createElement(leap_ui_1.Form.Item, { label: label }, getFieldDecorator(id)(react_1.default.createElement(leap_ui_1.Select, { placeholder: placeholder },
        react_1.default.createElement(Option, { value: "" }, "\u5168\u90E8"),
        values.map(function (_a) {
            var _b = optionLabelKey, label = _a[_b], _c = optionValueKey, value = _a[_c];
            return (react_1.default.createElement(Option, { key: value, value: value }, label));
        })))));
};
var SimpleInput = function (_a) {
    var label = _a.label, placeholder = _a.placeholder, id = _a.id, getFieldDecorator = _a.getFieldDecorator, onSubmit = _a.onSubmit;
    return (react_1.default.createElement(leap_ui_1.Form.Item, { label: label }, getFieldDecorator(id)(react_1.default.createElement(leap_ui_1.Input.Search, { placeholder: placeholder, onSearch: onSubmit }))));
};
var FilterForm = react_1.forwardRef(function (_a, wrappedComponentRef) {
    var form = _a.form, _b = _a.filters, filters = _b === void 0 ? [] : _b, onSubmit = _a.onSubmit;
    react_1.useImperativeHandle(wrappedComponentRef, function () { return ({
        form: form,
    }); });
    var getFieldDecorator = form.getFieldDecorator;
    var manualSearch = Array.isArray(filters) ? false : filters === null || filters === void 0 ? void 0 : filters.manualSearch;
    var getElement = function (_a) {
        var _b = _a.type, type = _b === void 0 ? "input" : _b, component = _a.component, props = __rest(_a, ["type", "component"]);
        if (component)
            return component(__assign(__assign({}, props), { getFieldDecorator: getFieldDecorator }));
        if (type === "input")
            return (react_1.default.createElement(SimpleInput, __assign({}, props, { getFieldDecorator: getFieldDecorator, onSubmit: function () { return onSubmit(utils_1.getPureObject(form.getFieldsValue())); } })));
        if (type === "select")
            return react_1.default.createElement(SimpleSelect, __assign({}, props, { getFieldDecorator: getFieldDecorator }));
        if (type === "multipleSelect")
            return react_1.default.createElement(MultipleSelect, __assign({}, props, { getFieldDecorator: getFieldDecorator }));
        if (type === "datePicker")
            return react_1.default.createElement(SimpleDatePicker, __assign({}, props, { getFieldDecorator: getFieldDecorator }));
        return null;
    };
    return (react_1.default.createElement(leap_ui_1.Form
    // layout="inline"
    , { 
        // layout="inline"
        hideRequiredMark: true, style: { width: "100%" }, className: style_less_1.default["filterBar"] },
        (Array.isArray(filters) ? filters : filters.data).map(getElement),
        manualSearch && (react_1.default.createElement(leap_ui_1.Form.Item, { label: " " },
            react_1.default.createElement(leap_ui_1.Button, { type: "primary", onClick: function () {
                    onSubmit(form.getFieldsValue());
                } }, "\u67E5\u8BE2")))));
});
var FilterGroup = leap_ui_1.Form.create({
    onValuesChange: function (props, _, allValues) {
        var _a;
        var manualSearch = Array.isArray(props.filters) ? false : (_a = props.filters) === null || _a === void 0 ? void 0 : _a.manualSearch;
        if (props.onSubmit && !manualSearch)
            props.onSubmit(allValues);
    },
})(FilterForm);
exports.FilterGroup = FilterGroup;
