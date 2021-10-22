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
import React from "react";
import classNames from "classnames";
import { Form, Row, Col } from "leap-ui";
import { rulesGenerator } from "../utils";
import styles from "./style.less";
export var LeFormItemGroup = function (_a) {
    var label = _a.label, labelCol = _a.labelCol, wrapperCol = _a.wrapperCol, items = _a.items, getElement = _a.getElement, getFieldDecorator = _a.getFieldDecorator, model = _a.model, className = _a.className, form = _a.form, props = __rest(_a, ["label", "labelCol", "wrapperCol", "items", "getElement", "getFieldDecorator", "model", "className", "form"]);
    return (React.createElement(Row, { className: classNames("ant-form-item", styles.formItemGroup, className) },
        label && (React.createElement(Col, __assign({ xs: { span: 24 }, sm: { span: 4 } }, labelCol, { className: "ant-form-item-label" }),
            React.createElement("label", null, label))),
        React.createElement(Col, __assign({ xs: { span: 24 }, sm: { span: 20 } }, wrapperCol, { className: "ant-form-item-control-wrapper" }),
            items.map(function (item, index) {
                var id = item.id, label = item.label, initialValue = item.initialValue, rules = item.rules, decorator = item.decorator, advRules = item.advRules, hidden = item.hidden, modelToValue = item.modelToValue, itemClassName = item.className, formItemLabelCol = item.labelCol, formItemWrapperCol = item.wrapperCol;
                return (React.createElement(Form.Item, { label: label, key: index, className: classNames(itemClassName, { hidden: hidden }), labelCol: formItemLabelCol, wrapperCol: formItemWrapperCol },
                    getFieldDecorator(id, __assign({ validateTrigger: ["onChange"], initialValue: model && model[id] !== undefined
                            ? modelToValue
                                ? modelToValue(model[id], model)
                                : model[id]
                            : initialValue, rules: rulesGenerator(label, rules, advRules) }, decorator))(item.render ? item.render({ form: form }) : getElement(__assign(__assign({}, item), { getFieldDecorator: getFieldDecorator }))),
                    item.suffix ? React.createElement("span", { className: "ant-form-text" },
                        " ",
                        item.suffix) : null));
            }),
            props.suffix ? React.createElement("div", { className: "ant-row ant-form-item" },
                " ",
                props.suffix) : null)));
};
