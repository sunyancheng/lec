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
import React, { useImperativeHandle, forwardRef, } from "react";
import { Form, Button, InputNumber } from "leap-ui";
import { Input } from "antd";
import styles from "./style.less";
import { rulesGenerator } from "../utils";
import classNames from "classnames";
import { LeSelect } from "../LeSelect";
import { LeRadio } from "../LeRadio";
import { LeCheckbox } from "../LeCheckbox";
import { LeFormItemGroup } from "../LeFormItemGroup";
import { LeMultipleSelect } from "../LeMultipleSelect";
import { LeDatePicker } from "../LeDatePicker";
import { LeTimePicker } from "../LeTimePicker";
import { LeCascader } from "../LeCascader";
export var processModel = function (models, values) {
    // 提交前待处理的 model
    var itemsModels = models
        .filter(function (m) { return m.type === "formItemGroup"; })
        .reduce(function (p, c) { return __spreadArray(__spreadArray([], __read(p)), __read(c.items)); }, []);
    var processedModel = __spreadArray(__spreadArray([], __read(models)), __read(itemsModels)).filter(function (m) { return m.valueToModel; });
    if (processedModel.length > 0) {
        return processedModel.reduce(function (p, _a) {
            var id = _a.id, valueToModel = _a.valueToModel;
            return __assign(__assign({}, p), valueToModel(id, values[id]));
        }, values);
    }
    return values;
};
export var processValuesBeforeSubmit = function (models, values, onSubmit) {
    var processedValues = processModel(models, values);
    onSubmit(processedValues);
};
var StaticText = function (props) { return (React.createElement("span", { className: "ant-form-text" }, props.value)); };
var getElement = function (_a) {
    var _b = _a.type, type = _b === void 0 ? "input" : _b, component = _a.component, _c = _a.options, options = _c === void 0 ? {} : _c, props = __rest(_a, ["type", "component", "options"]);
    if (props.readOnly)
        return React.createElement(StaticText, __assign({}, props));
    if (component)
        return component;
    if (type === "br")
        return React.createElement(Form.Item, { style: { width: "100%" } });
    if (type === "datePicker")
        return React.createElement(LeDatePicker, __assign({}, props));
    if (type === "timePicker")
        return React.createElement(LeTimePicker, __assign({}, props, options));
    if (type === "cascader")
        return React.createElement(LeCascader, __assign({}, props, options));
    if (type === "multipleSelect")
        return React.createElement(LeMultipleSelect, __assign({}, props));
    if (type === "textArea")
        return React.createElement(Input.TextArea, __assign({ placeholder: props.placeholder }, props));
    if (type === "input") {
        var Component = props.mode ? Input[props.mode] : Input;
        if (props.mode === "Search")
            props.onSearch = props.handleSearch;
        return React.createElement(Component, __assign({ placeholder: props.placeholder }, props));
    }
    if (type === "select")
        return React.createElement(LeSelect, __assign({}, props));
    if (type === "checkbox")
        return React.createElement(LeCheckbox, __assign({}, props));
    if (type === "radio")
        return React.createElement(LeRadio, __assign({}, props));
    if (type === "inputNumber")
        return React.createElement(InputNumber, __assign({ placeholder: props.placeholder }, props));
    return null;
};
var FilterForm = forwardRef(function (_a, wrappedComponentRef) {
    var form = _a.form, _b = _a.mode, mode = _b === void 0 ? "form" : _b, _c = _a.models, models = _c === void 0 ? [] : _c, _d = _a.model, modelItem = _d === void 0 ? {} : _d, onSubmit = _a.onSubmit, layout = _a.layout, className = _a.className, props = __rest(_a, ["form", "mode", "models", "model", "onSubmit", "layout", "className"]);
    var validateSubmit = function () {
        return new Promise(function (resolve, reject) {
            form.validateFields(function (errors, values) {
                if (errors)
                    reject();
                resolve(processModel(Array.isArray(models) ? models : models.data, values));
            });
        });
    };
    useImperativeHandle(wrappedComponentRef, function () { return ({
        form: form,
        validateSubmit: validateSubmit,
    }); });
    var getFieldDecorator = form.getFieldDecorator;
    var manualSearch = Array.isArray(models) ? false : models === null || models === void 0 ? void 0 : models.manualSearch;
    var manualReset = Array.isArray(models) ? false : models === null || models === void 0 ? void 0 : models.manualReset;
    var model = (Array.isArray(models)
        ? models
        : Array.isArray(models.data)
            ? models.data
            : [])
        .filter(function (m) { return m.derived; })
        .reduce(function (r, c) {
        var _a;
        return __assign(__assign({}, r), (_a = {}, _a[c.id] = c.derived(modelItem), _a));
    }, modelItem);
    var resetFilters = function () {
        form.resetFields();
    };
    var handleSearch = function () {
        var modelsList = Array.isArray(models) ? models : models === null || models === void 0 ? void 0 : models.data;
        processValuesBeforeSubmit(modelsList, form.getFieldsValue(), onSubmit);
    };
    return (React.createElement(Form, __assign({ layout: layout, hideRequiredMark: true, labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        }, wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        }, className: classNames(styles.Form, 
        //{ /*[styles.filterMode] : mode === 'filters',*/ [styles.formMode]: mode === "form" },
        className) }, props),
        (Array.isArray(models) ? models : models.data).map(function (_a, index) {
            var type = _a.type, label = _a.label, id = _a.id, renderItem = _a.renderItem, values = _a.values, rules = _a.rules, initialValue = _a.initialValue, _b = _a.decorator, decorator = _b === void 0 ? {} : _b, render = _a.render, advRules = _a.advRules, hidden = _a.hidden, modelToValue = _a.modelToValue, modelProps = __rest(_a, ["type", "label", "id", "renderItem", "values", "rules", "initialValue", "decorator", "render", "advRules", "hidden", "modelToValue"]);
            var modelClassName = modelProps.className, restModelProps = __rest(modelProps, ["className"]);
            return type === "formItemGroup" ? (React.createElement(LeFormItemGroup, __assign({ key: index, label: label, getElement: getElement, model: model, form: form }, modelProps, { getFieldDecorator: getFieldDecorator }))) : renderItem ? (renderItem({ form: form })) : (React.createElement(Form.Item, __assign({ key: index, label: label, className: classNames({ hidden: hidden }, modelClassName) }, restModelProps),
                getFieldDecorator(id, __assign({ validateTrigger: ["onChange"], rules: rulesGenerator(label, rules, advRules), initialValue: model && model[id] !== undefined
                        ? modelToValue
                            ? modelToValue(model[id], model)
                            : model[id]
                        : initialValue }, decorator))(render
                    ? render({ form: form })
                    : getElement(__assign(__assign({}, restModelProps), { values: values, type: type, handleSearch: handleSearch }))),
                restModelProps.suffix ? (React.createElement("span", { className: "ant-form-text" }, restModelProps.suffix)) : null));
        }),
        manualSearch && (React.createElement(Form.Item, { label: " ", className: "search-button-list" },
            React.createElement(Button, { type: "primary", onClick: handleSearch }, "\u67E5\u8BE2"),
            manualReset && (React.createElement(Button, { type: "default", onClick: resetFilters }, "\u91CD\u7F6E"))))));
});
var Form2 = Form.create({
    onValuesChange: function (props, changedValues, allValues) {
        var onValuesChange = props.onValuesChange, models = props.models, onSubmit = props.onSubmit;
        if (onValuesChange) {
            onValuesChange(props, changedValues, allValues);
        }
        var modelsList = Array.isArray(models) ? models : models === null || models === void 0 ? void 0 : models.data;
        var manualSearch = Array.isArray(models) ? false : models === null || models === void 0 ? void 0 : models.manualSearch;
        if (onSubmit && !manualSearch)
            processValuesBeforeSubmit(modelsList, allValues, onSubmit);
    },
})(FilterForm);
export { Form2 as LeForm };
