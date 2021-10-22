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
exports.LeFormItemGroup = void 0;
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var leap_ui_1 = require("leap-ui");
var utils_1 = require("../utils");
var style_less_1 = __importDefault(require("./style.less"));
var LeFormItemGroup = function (_a) {
    var label = _a.label, labelCol = _a.labelCol, wrapperCol = _a.wrapperCol, items = _a.items, getElement = _a.getElement, getFieldDecorator = _a.getFieldDecorator, model = _a.model, className = _a.className, form = _a.form, props = __rest(_a, ["label", "labelCol", "wrapperCol", "items", "getElement", "getFieldDecorator", "model", "className", "form"]);
    return (react_1.default.createElement(leap_ui_1.Row, { className: classnames_1.default("ant-form-item", style_less_1.default.formItemGroup, className) },
        label && (react_1.default.createElement(leap_ui_1.Col, __assign({ xs: { span: 24 }, sm: { span: 4 } }, labelCol, { className: "ant-form-item-label" }),
            react_1.default.createElement("label", null, label))),
        react_1.default.createElement(leap_ui_1.Col, __assign({ xs: { span: 24 }, sm: { span: 20 } }, wrapperCol, { className: "ant-form-item-control-wrapper" }),
            items.map(function (item, index) {
                var id = item.id, label = item.label, initialValue = item.initialValue, rules = item.rules, decorator = item.decorator, advRules = item.advRules, hidden = item.hidden, modelToValue = item.modelToValue, itemClassName = item.className, formItemLabelCol = item.labelCol, formItemWrapperCol = item.wrapperCol;
                return (react_1.default.createElement(leap_ui_1.Form.Item, { label: label, key: index, className: classnames_1.default(itemClassName, { hidden: hidden }), labelCol: formItemLabelCol, wrapperCol: formItemWrapperCol },
                    getFieldDecorator(id, __assign({ validateTrigger: ["onChange"], initialValue: model && model[id] !== undefined
                            ? modelToValue
                                ? modelToValue(model[id], model)
                                : model[id]
                            : initialValue, rules: utils_1.rulesGenerator(label, rules, advRules) }, decorator))(item.render ? item.render({ form: form }) : getElement(__assign(__assign({}, item), { getFieldDecorator: getFieldDecorator }))),
                    item.suffix ? react_1.default.createElement("span", { className: "ant-form-text" },
                        " ",
                        item.suffix) : null));
            }),
            props.suffix ? react_1.default.createElement("div", { className: "ant-row ant-form-item" },
                " ",
                props.suffix) : null)));
};
exports.LeFormItemGroup = LeFormItemGroup;
