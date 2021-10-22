"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSelectBox = void 0;
var classnames_1 = __importDefault(require("classnames"));
var leap_ui_1 = require("leap-ui");
var react_1 = __importDefault(require("react"));
var index_less_1 = __importDefault(require("./index.less"));
var CustomSelectBox = function (_a) {
    var disabled = _a.disabled, showValue = _a.showValue, onClear = _a.onClear, onOpen = _a.onOpen, _b = _a.style, style = _b === void 0 ? {} : _b, _c = _a.placeholder, placeholder = _c === void 0 ? "" : _c, _d = _a.className, className = _d === void 0 ? "" : _d, tooltipTitle = _a.tooltipTitle;
    return (react_1.default.createElement(leap_ui_1.Tooltip, { title: tooltipTitle, overlayClassName: index_less_1.default["customSelectBoxTip"], className: index_less_1.default["customSelectBoxContent"], style: { maxWidth: "auto" } },
        react_1.default.createElement(leap_ui_1.Input, { className: "customSelectBoxInput", onKeyDown: function (e) {
                if (e.keyCode === 40) {
                    return !disabled && onOpen && onOpen();
                }
            } }),
        react_1.default.createElement("div", { className: classnames_1.default("customElementBox " + index_less_1.default["customSelectBox"] + " " + className, {
                disabled: disabled,
            }), style: style },
            react_1.default.createElement("div", { className: showValue ? "text" : "placeholder", onClick: function () { return !disabled && onOpen && onOpen(); } }, showValue || placeholder || "请选择"),
            react_1.default.createElement(leap_ui_1.Icon, { type: "down" }),
            !!showValue && (react_1.default.createElement(leap_ui_1.Icon, { className: "close", type: "close-circle", theme: "filled", onClick: function (e) { return onClear && onClear(e); } })))));
};
exports.CustomSelectBox = CustomSelectBox;
