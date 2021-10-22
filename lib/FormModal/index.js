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
exports.FormModal = void 0;
var react_1 = __importStar(require("react"));
var leap_ui_1 = require("leap-ui");
var Form_1 = require("../Form");
var style_less_1 = __importDefault(require("./style.less"));
var request_1 = require("../utils/request");
var FormModal = function (_a) {
    var title = _a.title, visible = _a.visible, onCancel = _a.onCancel, className = _a.className, model = _a.model, namespace = _a.namespace, API = _a.API, formOptions = _a.formOptions, submitOptions = _a.submitOptions, saveLoading = _a.loading, singleClose = _a.singleClose, pageType = _a.pageType, props = __rest(_a, ["title", "visible", "onCancel", "className", "model", "namespace", "API", "formOptions", "submitOptions", "loading", "singleClose", "pageType"]);
    var formRef = react_1.createRef();
    var Form = pageType === "edit" || pageType === "detail" ? Form_1.LeEnhancedForm : Form_1.LeForm;
    var handleSubmit = function () {
        formRef.current.validateSubmit().then(function (model) {
            var action = submitOptions.action, payload = submitOptions.payload, onSuccess = submitOptions.onSuccess, beforeSubmit = submitOptions.beforeSubmit;
            var submit = function () {
                return request_1.REQUEST(API, namespace, action, typeof payload === "function" ? payload(model) : payload, function (respData, resp) {
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
    return (react_1.default.createElement(leap_ui_1.Modal, __assign({ maskClosable: false, visible: visible, onCancel: onCancel, title: title, width: 1200, className: style_less_1.default.FormModal, centered: true, footer: singleClose ? (react_1.default.createElement(leap_ui_1.Button, { type: "primary", onClick: onCancel }, "\u5173\u95ED")) : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(leap_ui_1.Button, { onClick: onCancel }, "\u53D6\u6D88"),
            react_1.default.createElement(leap_ui_1.Button, { type: "primary", onClick: handleSubmit, loading: saveLoading }, "\u786E\u5B9A"))) }, props),
        react_1.default.createElement(leap_ui_1.Spin, { spinning: false },
            react_1.default.createElement(Form, __assign({ wrappedComponentRef: formRef, style: { width: "100%" }, className: className, model: model }, formOptions),
                react_1.default.createElement("div", { className: "midRow" },
                    react_1.default.createElement(leap_ui_1.Button, { type: "primary" }, "\u786E\u5B9A"))))));
};
exports.FormModal = FormModal;
