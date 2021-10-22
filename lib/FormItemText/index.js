"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormItemText = void 0;
var react_1 = __importDefault(require("react"));
var leap_ui_1 = require("leap-ui");
var FormItemText = function (_a) {
    var label = _a.label, value = _a.value;
    return (react_1.default.createElement(leap_ui_1.Form.Item, { label: label },
        react_1.default.createElement("span", { className: "ant-form-text" }, value)));
};
exports.FormItemText = FormItemText;
