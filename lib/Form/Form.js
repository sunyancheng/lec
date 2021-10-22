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
exports.LeForm = exports.processValuesBeforeSubmit = exports.processModel = void 0;
var react_1 = __importStar(require("react"));
var leap_ui_1 = require("leap-ui");
var antd_1 = require("antd");
var style_less_1 = __importDefault(require("./style.less"));
var utils_1 = require("../utils");
var classnames_1 = __importDefault(require("classnames"));
var LeSelect_1 = require("../LeSelect");
var LeRadio_1 = require("../LeRadio");
var LeCheckbox_1 = require("../LeCheckbox");
var LeFormItemGroup_1 = require("../LeFormItemGroup");
var LeMultipleSelect_1 = require("../LeMultipleSelect");
var LeDatePicker_1 = require("../LeDatePicker");
var LeTimePicker_1 = require("../LeTimePicker");
var LeCascader_1 = require("../LeCascader");
var processModel = function (models, values) {
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
exports.processModel = processModel;
var processValuesBeforeSubmit = function (models, values, onSubmit) {
    var processedValues = exports.processModel(models, values);
    onSubmit(processedValues);
};
exports.processValuesBeforeSubmit = processValuesBeforeSubmit;
var StaticText = function (props) { return (react_1.default.createElement("span", { className: "ant-form-text" }, props.value)); };
var getElement = function (_a) {
    var _b = _a.type, type = _b === void 0 ? "input" : _b, component = _a.component, _c = _a.options, options = _c === void 0 ? {} : _c, props = __rest(_a, ["type", "component", "options"]);
    if (props.readOnly)
        return react_1.default.createElement(StaticText, __assign({}, props));
    if (component)
        return component;
    if (type === "br")
        return react_1.default.createElement(leap_ui_1.Form.Item, { style: { width: "100%" } });
    if (type === "datePicker")
        return react_1.default.createElement(LeDatePicker_1.LeDatePicker, __assign({}, props));
    if (type === "timePicker")
        return react_1.default.createElement(LeTimePicker_1.LeTimePicker, __assign({}, props, options));
    if (type === "cascader")
        return react_1.default.createElement(LeCascader_1.LeCascader, __assign({}, props, options));
    if (type === "multipleSelect")
        return react_1.default.createElement(LeMultipleSelect_1.LeMultipleSelect, __assign({}, props));
    if (type === "textArea")
        return react_1.default.createElement(antd_1.Input.TextArea, __assign({ placeholder: props.placeholder }, props));
    if (type === "input") {
        var Component = props.mode ? antd_1.Input[props.mode] : antd_1.Input;
        if (props.mode === "Search")
            props.onSearch = props.handleSearch;
        return react_1.default.createElement(Component, __assign({ placeholder: props.placeholder }, props));
    }
    if (type === "select")
        return react_1.default.createElement(LeSelect_1.LeSelect, __assign({}, props));
    if (type === "checkbox")
        return react_1.default.createElement(LeCheckbox_1.LeCheckbox, __assign({}, props));
    if (type === "radio")
        return react_1.default.createElement(LeRadio_1.LeRadio, __assign({}, props));
    if (type === "inputNumber")
        return react_1.default.createElement(leap_ui_1.InputNumber, __assign({ placeholder: props.placeholder }, props));
    return null;
};
var FilterForm = react_1.forwardRef(function (_a, wrappedComponentRef) {
    var form = _a.form, _b = _a.mode, mode = _b === void 0 ? "form" : _b, _c = _a.models, models = _c === void 0 ? [] : _c, _d = _a.model, modelItem = _d === void 0 ? {} : _d, onSubmit = _a.onSubmit, layout = _a.layout, className = _a.className, props = __rest(_a, ["form", "mode", "models", "model", "onSubmit", "layout", "className"]);
    var validateSubmit = function () {
        return new Promise(function (resolve, reject) {
            form.validateFields(function (errors, values) {
                if (errors)
                    reject();
                resolve(exports.processModel(Array.isArray(models) ? models : models.data, values));
            });
        });
    };
    react_1.useImperativeHandle(wrappedComponentRef, function () { return ({
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
        exports.processValuesBeforeSubmit(modelsList, form.getFieldsValue(), onSubmit);
    };
    return (react_1.default.createElement(leap_ui_1.Form, __assign({ layout: layout, hideRequiredMark: true, labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        }, wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        }, className: classnames_1.default(style_less_1.default.Form, 
        //{ /*[styles.filterMode] : mode === 'filters',*/ [styles.formMode]: mode === "form" },
        className) }, props),
        (Array.isArray(models) ? models : models.data).map(function (_a, index) {
            var type = _a.type, label = _a.label, id = _a.id, renderItem = _a.renderItem, values = _a.values, rules = _a.rules, initialValue = _a.initialValue, _b = _a.decorator, decorator = _b === void 0 ? {} : _b, render = _a.render, advRules = _a.advRules, hidden = _a.hidden, modelToValue = _a.modelToValue, modelProps = __rest(_a, ["type", "label", "id", "renderItem", "values", "rules", "initialValue", "decorator", "render", "advRules", "hidden", "modelToValue"]);
            var modelClassName = modelProps.className, restModelProps = __rest(modelProps, ["className"]);
            return type === "formItemGroup" ? (react_1.default.createElement(LeFormItemGroup_1.LeFormItemGroup, __assign({ key: index, label: label, getElement: getElement, model: model, form: form }, modelProps, { getFieldDecorator: getFieldDecorator }))) : renderItem ? (renderItem({ form: form })) : (react_1.default.createElement(leap_ui_1.Form.Item, __assign({ key: index, label: label, className: classnames_1.default({ hidden: hidden }, modelClassName) }, restModelProps),
                getFieldDecorator(id, __assign({ validateTrigger: ["onChange"], rules: utils_1.rulesGenerator(label, rules, advRules), initialValue: model && model[id] !== undefined
                        ? modelToValue
                            ? modelToValue(model[id], model)
                            : model[id]
                        : initialValue }, decorator))(render
                    ? render({ form: form })
                    : getElement(__assign(__assign({}, restModelProps), { values: values, type: type, handleSearch: handleSearch }))),
                restModelProps.suffix ? (react_1.default.createElement("span", { className: "ant-form-text" }, restModelProps.suffix)) : null));
        }),
        manualSearch && (react_1.default.createElement(leap_ui_1.Form.Item, { label: " ", className: "search-button-list" },
            react_1.default.createElement(leap_ui_1.Button, { type: "primary", onClick: handleSearch }, "\u67E5\u8BE2"),
            manualReset && (react_1.default.createElement(leap_ui_1.Button, { type: "default", onClick: resetFilters }, "\u91CD\u7F6E"))))));
});
var Form2 = leap_ui_1.Form.create({
    onValuesChange: function (props, changedValues, allValues) {
        var onValuesChange = props.onValuesChange, models = props.models, onSubmit = props.onSubmit;
        if (onValuesChange) {
            onValuesChange(props, changedValues, allValues);
        }
        var modelsList = Array.isArray(models) ? models : models === null || models === void 0 ? void 0 : models.data;
        var manualSearch = Array.isArray(models) ? false : models === null || models === void 0 ? void 0 : models.manualSearch;
        if (onSubmit && !manualSearch)
            exports.processValuesBeforeSubmit(modelsList, allValues, onSubmit);
    },
})(FilterForm);
exports.LeForm = Form2;
