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
exports.TreeSelect = void 0;
var react_1 = __importDefault(require("react"));
// import { TreeSelect } from "leap-ui";
var antd_1 = require("antd");
var TreeSelect2 = function (_a) {
    var onChange = _a.onChange, props = __rest(_a, ["onChange"]);
    var onChange1 = function (value, label, extra) {
        onChange(value, label, extra);
        console.log(extra.triggerNode.props);
    };
    return react_1.default.createElement(antd_1.TreeSelect, __assign({ onChange: onChange1 }, props));
};
exports.TreeSelect = TreeSelect2;
