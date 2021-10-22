import React from "react";
import { Form } from "leap-ui";
export var FormItemText = function (_a) {
    var label = _a.label, value = _a.value;
    return (React.createElement(Form.Item, { label: label },
        React.createElement("span", { className: "ant-form-text" }, value)));
};
