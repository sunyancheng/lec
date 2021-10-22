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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormPage = void 0;
var react_1 = __importStar(require("react"));
var Form_1 = require("../Form");
var leap_ui_1 = require("leap-ui");
var request_1 = require("../utils/request");
var luban_router_1 = require("luban-router");
var style_less_1 = __importDefault(require("./style.less"));
var Footer = function (_a) {
    var children = _a.children;
    return react_1.default.createElement("div", { className: style_less_1.default.Footer }, children);
};
exports.FormPage = react_1.forwardRef(function (_a, formPageRef) {
    var footer = _a.footer, namespace = _a.namespace, pageType = _a.pageType, formOptions = _a.formOptions, submitOptions = _a.submitOptions, API = _a.API, onCancel = _a.onCancel;
    var formRef = react_1.createRef();
    react_1.useImperativeHandle(formPageRef, function () { return (__assign({}, formRef === null || formRef === void 0 ? void 0 : formRef.current)); });
    var handleSubmit = function () {
        formRef.current.validateSubmit().then(function (model) {
            var action = submitOptions.action, payload = submitOptions.payload, onSuccess = submitOptions.onSuccess, beforeSubmit = submitOptions.beforeSubmit;
            var submit = function () {
                request_1.REQUEST(API, namespace, action, typeof payload === "function" ? payload(model) : payload, function (responseData, response) {
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
    var Form = pageType === "edit" || pageType === "detail" ? Form_1.LeEnhancedForm : Form_1.LeForm;
    var history = luban_router_1.useHistory();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Form, __assign({ namespace: namespace, wrappedComponentRef: formRef, API: API }, formOptions)),
        react_1.default.createElement(Footer, null, (Array.isArray(footer) ? footer : defaultBtn).map(function (btn, i) { return (react_1.default.createElement(leap_ui_1.Button, { key: i, type: btn.type, onClick: function () {
                return btn.navigator
                    ? history.push(btn.navigator)
                    : btn.onClick(formRef.current);
            }, disabled: btn.disabled }, btn.title)); }))));
});
