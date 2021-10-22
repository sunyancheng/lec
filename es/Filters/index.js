import React, { useRef, forwardRef, useImperativeHandle, } from "react";
import { LeForm } from "../Form";
import styles from "./style.less";
var Filters = forwardRef(function (_a, wrappedComponentRef) {
    var _b = _a.filters, filters = _b === void 0 ? [] : _b, onSubmit = _a.onSubmit;
    var formRef = useRef(null);
    useImperativeHandle(wrappedComponentRef, function () { return formRef.current; });
    return (React.createElement(LeForm, { wrappedComponentRef: formRef, mode: "filter", models: filters, labelCol: undefined, wrapperCol: undefined, className: styles["filterBar"], onSubmit: onSubmit }));
});
export { Filters };
