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
import React, { createRef } from "react";
import { Modal, Button, Spin } from "leap-ui";
import { LeForm, LeEnhancedForm } from "../Form";
import styles from "./style.less";
import { REQUEST } from "../utils/request";
var FormModal = function (_a) {
    var title = _a.title, visible = _a.visible, onCancel = _a.onCancel, className = _a.className, model = _a.model, namespace = _a.namespace, API = _a.API, formOptions = _a.formOptions, submitOptions = _a.submitOptions, saveLoading = _a.loading, singleClose = _a.singleClose, pageType = _a.pageType, props = __rest(_a, ["title", "visible", "onCancel", "className", "model", "namespace", "API", "formOptions", "submitOptions", "loading", "singleClose", "pageType"]);
    var formRef = createRef();
    var Form = pageType === "edit" || pageType === "detail" ? LeEnhancedForm : LeForm;
    var handleSubmit = function () {
        formRef.current.validateSubmit().then(function (model) {
            var action = submitOptions.action, payload = submitOptions.payload, onSuccess = submitOptions.onSuccess, beforeSubmit = submitOptions.beforeSubmit;
            var submit = function () {
                return REQUEST(API, namespace, action, typeof payload === "function" ? payload(model) : payload, function (respData, resp) {
                    onCancel();
                    if (onSuccess) {
                        onSuccess(respData, resp);
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
    return (React.createElement(Modal, __assign({ maskClosable: false, visible: visible, onCancel: onCancel, title: title, width: 1200, className: styles.FormModal, centered: true, footer: singleClose ? (React.createElement(Button, { type: "primary", onClick: onCancel }, "\u5173\u95ED")) : (React.createElement(React.Fragment, null,
            React.createElement(Button, { onClick: onCancel }, "\u53D6\u6D88"),
            React.createElement(Button, { type: "primary", onClick: handleSubmit, loading: saveLoading }, "\u786E\u5B9A"))) }, props),
        React.createElement(Spin, { spinning: false },
            React.createElement(Form, __assign({ wrappedComponentRef: formRef, style: { width: "100%" }, className: className, model: model }, formOptions),
                React.createElement("div", { className: "midRow" },
                    React.createElement(Button, { type: "primary" }, "\u786E\u5B9A"))))));
};
export { FormModal };
