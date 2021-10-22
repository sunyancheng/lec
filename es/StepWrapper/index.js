var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import React, { useEffect, useState } from "react";
import { Steps } from "leap-ui";
import styles from "./style.less";
var Step = Steps.Step;
export var StepWrapper = function (_a) {
    var steps = _a.steps, disabled = _a.disabled, _b = _a.step, step = _b === void 0 ? 0 : _b;
    var _c = __read(useState(step), 2), current = _c[0], setCurrentStep = _c[1];
    var onChange = function (current) {
        setCurrentStep(current);
    };
    useEffect(function () {
        setCurrentStep(step);
    }, [step]);
    return (React.createElement("div", { className: styles.StepWrapper },
        React.createElement(Steps, { style: { width: "50%", margin: "0 auto 20px" }, labelPlacement: "vertical", size: "small", current: current, onChange: disabled ? undefined : onChange }, steps.map(function (item) { return (React.createElement(Step, { key: item.title, title: item.title })); })),
        React.createElement("div", null, steps[current].content)));
};
