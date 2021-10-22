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
import React from "react";
import { LeForm } from "./Form";
import useRequest from "@luban-hooks/use-request";
export var LeEnhancedForm = function (props) {
    var namespace = props.namespace, API = props.API, defaultParams = props.defaultParams, requestOptions = props.requestOptions;
    var model = useRequest(API[namespace + "Retrieve"], __assign({ defaultParams: defaultParams || {}, formatter: function (res) { return res.data.data; } }, requestOptions)).data;
    return React.createElement(LeForm, __assign({}, props, { model: model }));
};
