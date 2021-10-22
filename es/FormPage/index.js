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
import React, { createRef, forwardRef, useImperativeHandle, } from "react";
import { LeForm, LeEnhancedForm } from "../Form";
import { Button } from "leap-ui";
import { REQUEST } from "../utils/request";
import { useHistory } from "luban-router";
import styles from "./style.less";
var Footer = function (_a) {
    var children = _a.children;
    return React.createElement("div", { className: styles.Footer }, children);
};
export var FormPage = forwardRef(function (_a, formPageRef) {
    var footer = _a.footer, namespace = _a.namespace, pageType = _a.pageType, formOptions = _a.formOptions, submitOptions = _a.submitOptions, API = _a.API, onCancel = _a.onCancel;
    var formRef = createRef();
    useImperativeHandle(formPageRef, function () { return (__assign({}, formRef === null || formRef === void 0 ? void 0 : formRef.current)); });
    var handleSubmit = function () {
        formRef.current.validateSubmit().then(function (model) {
            var action = submitOptions.action, payload = submitOptions.payload, onSuccess = submitOptions.onSuccess, beforeSubmit = submitOptions.beforeSubmit;
            var submit = function () {
                REQUEST(API, namespace, action, typeof payload === "function" ? payload(model) : payload, function (responseData, response) {
                    if (onSuccess) {
                        onSuccess(responseData, response);
                    }
                });
            };
            if (typeof beforeSubmit === "function") {
                if (beforeSubmit(model, formRef.current) === true) {
                    submit();
                }
            }
            else {
                submit();
            }
        });
    };
    var defaultBtn = [
        {
            title: "取消",
            type: "default",
            onClick: function () {
                if (onCancel) {
                    onCancel();
                }
            },
        },
        {
            title: "保存",
            type: "primary",
            onClick: handleSubmit,
        },
    ];
    var Form = pageType === "edit" || pageType === "detail" ? LeEnhancedForm : LeForm;
    var history = useHistory();
    return (React.createElement(React.Fragment, null,
        React.createElement(Form, __assign({ namespace: namespace, wrappedComponentRef: formRef, API: API }, formOptions)),
        React.createElement(Footer, null, (Array.isArray(footer) ? footer : defaultBtn).map(function (btn, i) { return (React.createElement(Button, { key: i, type: btn.type, onClick: function () {
                return btn.navigator
                    ? history.push(btn.navigator)
                    : btn.onClick(formRef.current);
            }, disabled: btn.disabled }, btn.title)); }))));
});
