"use strict";
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
exports.Stage = void 0;
var leap_ui_1 = require("leap-ui");
var react_1 = __importDefault(require("react"));
var style_less_1 = __importDefault(require("./style.less"));
var StageItem = function (_a) {
    var _b = _a.start, start = _b === void 0 ? 0 : _b, _c = _a.end, end = _c === void 0 ? 60 : _c, readOnly = _a.readOnly, index = _a.index, total = _a.total, onChange = _a.onChange, startLabel = _a.startLabel, endLabel = _a.endLabel;
    return (react_1.default.createElement("div", { className: style_less_1.default.stageItem },
        react_1.default.createElement("span", { className: "order" }, index + 1),
        react_1.default.createElement("div", null,
            startLabel,
            index > 0 ? (readOnly ? (react_1.default.createElement("span", null, start)) : (react_1.default.createElement(leap_ui_1.InputNumber, { value: start, onChange: function (value) { return onChange(index, 0, value); } }))) : (start)),
        react_1.default.createElement("div", null,
            endLabel,
            index + 1 < total ? (readOnly ? (react_1.default.createElement("span", null, end)) : (react_1.default.createElement(leap_ui_1.InputNumber, { disabled: readOnly, value: end, onChange: function (value) { return onChange(index, 1, value); } }))) : (end))));
};
var Stage = function (_a) {
    var start = _a.start, end = _a.end, _b = _a.value, stages = _b === void 0 ? [[start, end]] : _b, onChange = _a.onChange, startLabel = _a.startLabel, endLabel = _a.endLabel, readOnly = _a.readOnly;
    var onChange1 = function (stageIndex, index, value) {
        var newStages = stages.map(function (item, i) {
            // 修改对应值
            if (i === stageIndex) {
                item[index] = value;
            }
            // 修改 end 下一个 start 联动
            if (index === 1 && i === stageIndex + 1) {
                item[0] = value + 1;
            }
            // 修改 start 上一个 end 联动
            if (index === 0 && i === stageIndex - 1) {
                item[1] = value - 1;
            }
            return item;
        });
        onChange(newStages);
    };
    return (react_1.default.createElement("div", { className: style_less_1.default.Stage }, stages.map(function (_a, index) {
        var _b = __read(_a, 2), s = _b[0], e = _b[1];
        return (react_1.default.createElement(StageItem, { key: index, index: index, start: s, end: e, readOnly: readOnly, total: stages.length, onChange: onChange1, startLabel: startLabel, endLabel: endLabel }));
    })));
};
exports.Stage = Stage;
