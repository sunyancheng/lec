"use strict";
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
exports.Filters = void 0;
var react_1 = __importStar(require("react"));
var Form_1 = require("../Form");
var style_less_1 = __importDefault(require("./style.less"));
var Filters = react_1.forwardRef(function (_a, wrappedComponentRef) {
    var _b = _a.filters, filters = _b === void 0 ? [] : _b, onSubmit = _a.onSubmit;
    var formRef = react_1.useRef(null);
    react_1.useImperativeHandle(wrappedComponentRef, function () { return formRef.current; });
    return (react_1.default.createElement(Form_1.LeForm, { wrappedComponentRef: formRef, mode: "filter", models: filters, labelCol: undefined, wrapperCol: undefined, className: style_less_1.default["filterBar"], onSubmit: onSubmit }));
});
exports.Filters = Filters;
