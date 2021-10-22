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
import React, { useImperativeHandle, forwardRef } from "react";
import { Form, Select, Input, Button, DatePicker } from "leap-ui";
import { getPureObject } from "../utils";
import styles from "./style.less";
var Option = Select.Option;
var SimpleDatePicker = function (_a) {
    var label = _a.label, placeholder = _a.placeholder, id = _a.id, getFieldDecorator = _a.getFieldDecorator;
    return (React.createElement(Form.Item, { label: label }, getFieldDecorator(id)(React.createElement(DatePicker, { placeholder: placeholder }))));
};
var MultipleSelect = function (_a) {
    var label = _a.label, placeholder = _a.placeholder, id = _a.id, _b = _a.optionLabelKey, optionLabelKey = _b === void 0 ? "label" : _b, _c = _a.optionValueKey, optionValueKey = _c === void 0 ? "value" : _c, _d = _a.maxTagCount, maxTagCount = _d === void 0 ? 1 : _d, _e = _a.values, values = _e === void 0 ? [] : _e, getFieldDecorator = _a.getFieldDecorator;
    return (React.createElement(Form.Item, { label: label }, getFieldDecorator(id)(React.createElement(Select, { placeholder: placeholder, mode: "multiple", maxTagCount: maxTagCount }, values.map(function (_a) {
        var _b = optionLabelKey, label = _a[_b], _c = optionValueKey, value = _a[_c];
        return (React.createElement(Option, { key: value, value: value }, label));
    })))));
};
var SimpleSelect = function (_a) {
    var label = _a.label, placeholder = _a.placeholder, id = _a.id, _b = _a.optionLabelKey, optionLabelKey = _b === void 0 ? "label" : _b, _c = _a.optionValueKey, optionValueKey = _c === void 0 ? "value" : _c, _d = _a.values, values = _d === void 0 ? [] : _d, getFieldDecorator = _a.getFieldDecorator;
    return (React.createElement(Form.Item, { label: label }, getFieldDecorator(id)(React.createElement(Select, { placeholder: placeholder },
        React.createElement(Option, { value: "" }, "\u5168\u90E8"),
        values.map(function (_a) {
            var _b = optionLabelKey, label = _a[_b], _c = optionValueKey, value = _a[_c];
            return (React.createElement(Option, { key: value, value: value }, label));
        })))));
};
var SimpleInput = function (_a) {
    var label = _a.label, placeholder = _a.placeholder, id = _a.id, getFieldDecorator = _a.getFieldDecorator, onSubmit = _a.onSubmit;
    return (React.createElement(Form.Item, { label: label }, getFieldDecorator(id)(React.createElement(Input.Search, { placeholder: placeholder, onSearch: onSubmit }))));
};
var FilterForm = forwardRef(function (_a, wrappedComponentRef) {
    var form = _a.form, _b = _a.filters, filters = _b === void 0 ? [] : _b, onSubmit = _a.onSubmit;
    useImperativeHandle(wrappedComponentRef, function () { return ({
        form: form,
    }); });
    var getFieldDecorator = form.getFieldDecorator;
    var manualSearch = Array.isArray(filters) ? false : filters === null || filters === void 0 ? void 0 : filters.manualSearch;
    var getElement = function (_a) {
        var _b = _a.type, type = _b === void 0 ? "input" : _b, component = _a.component, props = __rest(_a, ["type", "component"]);
        if (component)
            return component(__assign(__assign({}, props), { getFieldDecorator: getFieldDecorator }));
        if (type === "input")
            return (React.createElement(SimpleInput, __assign({}, props, { getFieldDecorator: getFieldDecorator, onSubmit: function () { return onSubmit(getPureObject(form.getFieldsValue())); } })));
        if (type === "select")
            return React.createElement(SimpleSelect, __assign({}, props, { getFieldDecorator: getFieldDecorator }));
        if (type === "multipleSelect")
            return React.createElement(MultipleSelect, __assign({}, props, { getFieldDecorator: getFieldDecorator }));
        if (type === "datePicker")
            return React.createElement(SimpleDatePicker, __assign({}, props, { getFieldDecorator: getFieldDecorator }));
        return null;
    };
    return (React.createElement(Form
    // layout="inline"
    , { 
        // layout="inline"
        hideRequiredMark: true, style: { width: "100%" }, className: styles["filterBar"] },
        (Array.isArray(filters) ? filters : filters.data).map(getElement),
        manualSearch && (React.createElement(Form.Item, { label: " " },
            React.createElement(Button, { type: "primary", onClick: function () {
                    onSubmit(form.getFieldsValue());
                } }, "\u67E5\u8BE2")))));
});
var FilterGroup = Form.create({
    onValuesChange: function (props, _, allValues) {
        var _a;
        var manualSearch = Array.isArray(props.filters) ? false : (_a = props.filters) === null || _a === void 0 ? void 0 : _a.manualSearch;
        if (props.onSubmit && !manualSearch)
            props.onSubmit(allValues);
    },
})(FilterForm);
export { FilterGroup };
