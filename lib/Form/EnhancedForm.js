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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeEnhancedForm = void 0;
var react_1 = __importDefault(require("react"));
var Form_1 = require("./Form");
var use_request_1 = __importDefault(require("@luban-hooks/use-request"));
var LeEnhancedForm = function (props) {
    var namespace = props.namespace, API = props.API, defaultParams = props.defaultParams, requestOptions = props.requestOptions;
    var model = use_request_1.default(API[namespace + "Retrieve"], __assign({ defaultParams: defaultParams || {}, formatter: function (res) { return res.data.data; } }, requestOptions)).data;
    return react_1.default.createElement(Form_1.LeForm, __assign({}, props, { model: model }));
};
exports.LeEnhancedForm = LeEnhancedForm;
