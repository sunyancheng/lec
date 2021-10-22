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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepWrapper = void 0;
var react_1 = __importStar(require("react"));
var leap_ui_1 = require("leap-ui");
var style_less_1 = __importDefault(require("./style.less"));
var Step = leap_ui_1.Steps.Step;
var StepWrapper = function (_a) {
    var steps = _a.steps, disabled = _a.disabled, _b = _a.step, step = _b === void 0 ? 0 : _b;
    var _c = __read(react_1.useState(step), 2), current = _c[0], setCurrentStep = _c[1];
    var onChange = function (current) {
        setCurrentStep(current);
    };
    react_1.useEffect(function () {
        setCurrentStep(step);
    }, [step]);
    return (react_1.default.createElement("div", { className: style_less_1.default.StepWrapper },
        react_1.default.createElement(leap_ui_1.Steps, { style: { width: "50%", margin: "0 auto 20px" }, labelPlacement: "vertical", size: "small", current: current, onChange: disabled ? undefined : onChange }, steps.map(function (item) { return (react_1.default.createElement(Step, { key: item.title, title: item.title })); })),
        react_1.default.createElement("div", null, steps[current].content)));
};
exports.StepWrapper = StepWrapper;
