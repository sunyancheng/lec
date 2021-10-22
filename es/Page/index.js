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
import React, { forwardRef, useState, useImperativeHandle, } from "react";
import classNames from "classnames";
import { Filters } from "../Filters";
import { ListTable } from "../ListTable";
import useRequest from "@luban-hooks/use-request";
import { Modal, Button } from "leap-ui";
import { REQUEST, REQUEST_MANUAL } from "../utils/request";
import { FormModal } from "../FormModal";
import { useRef } from "react";
var initialPageCriteria = { page: 1, page_size: 20 };
var generateAction = function (API, namespace, columns, options) {
    return columns.map(function (column) {
        if (column.dataIndex === "actionColumn" && column.actionList) {
            var render = function (text, record) {
                var actions = column.actionList(text, record);
                if (actions.length === 0)
                    return column.nullRender || "";
                return (React.createElement("div", { className: "over_text" }, actions.map(function (item, index) {
                    return item.type === "download" ? (React.createElement("a", { href: item.downloadURL, className: classNames("icon_blue", {
                            disabled: item.disabled,
                        }), download: true }, item.title)) : (React.createElement("span", { key: index, className: classNames("icon_blue", {
                            disabled: item.disabled,
                        }), onClick: function () {
                            if (item.disabled)
                                return;
                            if (item.modalTrigger) {
                                item.onTriggered && item.onTriggered(record);
                                options.setVisibleModal(item.modalTrigger);
                                options.setModalPayload(record);
                                return;
                            }
                            if (item.type === "confirm") {
                                Modal.confirm(__assign({ title: "删除后不可恢复，确认删除？", onOk: function () {
                                        REQUEST(API, namespace, item.action, item.payload, options.getList);
                                    } }, item.confirm));
                            }
                            else {
                                item.onClick(record);
                            }
                        } }, item.title));
                })));
            };
            return __assign(__assign({}, column), { render: render });
        }
        if (column.action && column.render) {
            var render = function (text, record) {
                var action = REQUEST_MANUAL(API, namespace, column.action, options.getList);
                return column.render(text, record, action);
            };
            return __assign(__assign({}, column), { render: render });
        }
        return column;
    });
};
var Buttons = function (_a) {
    var buttons = _a.buttons, setVisibleModal = _a.setVisibleModal;
    if (!Array.isArray(buttons))
        return null;
    return (React.createElement("div", { className: "topButtonGroup" }, buttons.map(function (_a, key) {
        var modalTrigger = _a.modalTrigger, navigator = _a.navigator, btn = __rest(_a, ["modalTrigger", "navigator"]);
        return (React.createElement(Button, __assign({}, btn, { key: key, onClick: modalTrigger
                ? function () { return setVisibleModal(modalTrigger); }
                : btn.onClick
                    ? btn.onClick
                    : null }), btn.title));
    })));
};
var Modals = function (_a) {
    var modals = _a.modals, visibleModal = _a.visibleModal, setVisibleModal = _a.setVisibleModal, getList = _a.getList, modalPayload = _a.modalPayload;
    if (!Array.isArray(modals))
        return null;
    var onCancel = function () { return setVisibleModal(null); };
    var submitOptions = function (modal) { return (__assign(__assign({}, modal.submitOptions), { onSuccess: function () {
            var onSuccess = modal.submitOptions.onSuccess;
            if (onSuccess) {
                onSuccess();
            }
            getList();
        } })); };
    return (React.createElement("div", { className: "topButtonGroup" }, modals.map(function (_a, key) {
        var name = _a.name, modal = __rest(_a, ["name"]);
        return visibleModal === name && (React.createElement(FormModal, __assign({ visible: true, onCancel: onCancel }, modal, { formOptions: typeof modal.formOptions === "function"
                ? modal.formOptions(modalPayload)
                : modal.formOptions, submitOptions: submitOptions(modal), key: key })));
    })));
};
var Page = forwardRef(function (_a, leComponentRef) {
    var modals = _a.modals, filters = _a.filters, tableOptions = _a.tableOptions, buttons = _a.buttons, namespace = _a.namespace, children = _a.children, controlBar = _a.controlBar, defaultSearchCriteria = _a.defaultSearchCriteria, API = _a.API, requestOptions = _a.requestOptions, singlePage = _a.singlePage, onComplete = _a.onComplete, formatter = _a.formatter;
    // filter从model中接收initialValue 作为初始查询参数,
    var initialCriteria = (Array.isArray(filters) ? filters : filters.data)
        .filter(function (m) { return m.initialValue !== undefined; })
        .reduce(function (p, _a) {
        var _b;
        var id = _a.id, initialValue = _a.initialValue, valueToModel = _a.valueToModel;
        var criteria = valueToModel
            ? valueToModel(id, initialValue)
            : (_b = {}, _b[id] = initialValue, _b);
        return __assign(__assign({}, p), criteria);
    }, {});
    var filterType = useRef("filter");
    var _b = __read(useState(singlePage
        ? initialCriteria
        : __assign(__assign({}, initialPageCriteria), initialCriteria)), 2), criteria = _b[0], setCriteria = _b[1];
    var _c = useRequest(API[namespace + "GetList"], __assign({ initialData: [], defaultParams: __assign(__assign({}, criteria), defaultSearchCriteria), formatter: formatter ? formatter : function (res) { return res.data.data; }, onSuccess: function (data) {
            setLoading(false);
            if (onComplete)
                onComplete(data, filterType.current);
        }, onError: function () {
            setLoading(false);
            if (onComplete)
                onComplete();
        } }, requestOptions)), listData = _c.data, loadData2 = _c.run;
    var loadData = function (params) {
        setLoading(true);
        loadData2(params);
    };
    var filterRef = useRef(null);
    useImperativeHandle(leComponentRef, function () {
        var _a;
        return ({
            criteria: criteria,
            pageData: listData,
            loadData: function (c) { return loadData(__assign(__assign({}, criteria), c)); },
            filters: (_a = filterRef === null || filterRef === void 0 ? void 0 : filterRef.current) === null || _a === void 0 ? void 0 : _a.form,
        });
    });
    var onFilter = function (newCriteria) {
        var params = __assign(__assign({}, criteria), newCriteria);
        if (!Array.isArray(filters) &&
            filters.toVerify &&
            !filters.toVerify(__assign({}, params)))
            return;
        var page = singlePage ? undefined : "1";
        setCriteria(function (prevCriteria) { return (__assign(__assign(__assign({}, prevCriteria), newCriteria), { page: page })); });
        filterType.current = "filter";
        loadData(__assign({}, params));
    };
    var onPageChange = function (page, page_size) {
        loadData(__assign(__assign({}, criteria), { page: page, page_size: page_size }));
        filterType.current = "page";
        setCriteria(__assign(__assign({}, criteria), { page: page }));
    };
    var tableColumns = tableOptions.columns, tableRestOptions = __rest(tableOptions, ["columns"]);
    var getList = function () { return loadData(criteria); };
    var _d = __read(useState([]), 2), visibleModal = _d[0], setVisibleModal = _d[1];
    var _e = __read(useState(null), 2), modalPayload = _e[0], setModalPayload = _e[1];
    var _f = __read(useState(true), 2), loading = _f[0], setLoading = _f[1];
    var columns = generateAction(API, namespace, tableColumns, {
        setVisibleModal: setVisibleModal,
        setModalPayload: setModalPayload,
        getList: getList,
    });
    return (React.createElement("div", { className: "normal-page" },
        React.createElement(Modals, { modals: modals, visibleModal: visibleModal, setVisibleModal: setVisibleModal, modalPayload: modalPayload, getList: getList }),
        React.createElement(Buttons, { buttons: buttons, setVisibleModal: setVisibleModal }),
        React.createElement(Filters, { filters: filters, onSubmit: onFilter, ref: filterRef }),
        controlBar ? controlBar(criteria) : null,
        React.createElement(ListTable, { tableOptions: __assign({ loading: loading }, tableRestOptions), columns: columns, data: listData, singlePage: singlePage, onPageChange: singlePage ? undefined : onPageChange }),
        children));
});
export { Page };
