import classNames from "classnames";
import { Icon, Input, Tooltip } from "leap-ui";
import React from "react";
import styles from "./index.less";
export var CustomSelectBox = function (_a) {
    var disabled = _a.disabled, showValue = _a.showValue, onClear = _a.onClear, onOpen = _a.onOpen, _b = _a.style, style = _b === void 0 ? {} : _b, _c = _a.placeholder, placeholder = _c === void 0 ? "" : _c, _d = _a.className, className = _d === void 0 ? "" : _d, tooltipTitle = _a.tooltipTitle;
    return (React.createElement(Tooltip, { title: tooltipTitle, overlayClassName: styles["customSelectBoxTip"], className: styles["customSelectBoxContent"], style: { maxWidth: "auto" } },
        React.createElement(Input, { className: "customSelectBoxInput", onKeyDown: function (e) {
                if (e.keyCode === 40) {
                    return !disabled && onOpen && onOpen();
                }
            } }),
        React.createElement("div", { className: classNames("customElementBox " + styles["customSelectBox"] + " " + className, {
                disabled: disabled,
            }), style: style },
            React.createElement("div", { className: showValue ? "text" : "placeholder", onClick: function () { return !disabled && onOpen && onOpen(); } }, showValue || placeholder || "请选择"),
            React.createElement(Icon, { type: "down" }),
            !!showValue && (React.createElement(Icon, { className: "close", type: "close-circle", theme: "filled", onClick: function (e) { return onClear && onClear(e); } })))));
};
