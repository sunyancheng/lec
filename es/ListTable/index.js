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
import React, { memo } from "react";
import { Table } from "leap-ui";
import classNames from "classnames";
import styles from "./style.less";
export var ListTable = memo(function (_a) {
    var data = _a.data, className = _a.className, _b = _a.tableOptions, tableOptions = _b === void 0 ? {} : _b, columns = _a.columns, onPageChange = _a.onPageChange, singlePage = _a.singlePage;
    var _c = tableOptions.pageOptions, pageOptions = _c === void 0 ? {} : _c, tableProps = __rest(tableOptions, ["pageOptions"]);
    return (React.createElement(Table, __assign({ className: classNames(className, styles.ListTable), columns: columns }, tableProps, { dataSource: singlePage
            ? Array.isArray(data)
                ? data
                : []
            : Array.isArray(data === null || data === void 0 ? void 0 : data.data)
                ? data === null || data === void 0 ? void 0 : data.data
                : [], pagination: singlePage
            ? false
            : __assign(__assign({}, pageOptions), { current: Number((data === null || data === void 0 ? void 0 : data.current_page) || 1), pageSize: Number((data === null || data === void 0 ? void 0 : data.page_size) || (data === null || data === void 0 ? void 0 : data.per_page) || 20), total: Number(data === null || data === void 0 ? void 0 : data.total), onChange: function (page, pageSize) { return onPageChange("" + page, pageSize); } }) })));
});
