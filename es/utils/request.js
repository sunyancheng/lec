var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
import { message } from "leap-ui";
var TEXT = {
    Create: "新建",
    Update: "修改",
    Delete: "删除",
    Release: "发布",
};
var firstUpperCase = function (str) {
    return str.replace(/( |^)[a-z]/g, function (L) { return L.toUpperCase(); });
};
export var REQUEST = function (API, namespace, action, payload, onSuccess, onError) { return __awaiter(void 0, void 0, void 0, function () {
    var ignoreResponseCode, silentMessage, responseError, requestOptions, params, HTTP_SUCCESS_CODE, RESPONSE_SUCCESS_CODE, RESPONSE_CODE_KEY, RESPONSE_MESSAGE_KEY, RESPONSE_DATA_KEY, _a, _b, request, r, _c, status, _d, _e, code, _f, msg, _g, responseData;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                ignoreResponseCode = payload.ignoreResponseCode, silentMessage = payload.silentMessage, responseError = payload.responseError, requestOptions = payload.requestOptions, params = __rest(payload, ["ignoreResponseCode", "silentMessage", "responseError", "requestOptions"]);
                HTTP_SUCCESS_CODE = (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.httpSuccessCode) || 200;
                RESPONSE_SUCCESS_CODE = (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.responseSuccessCode) || 0;
                RESPONSE_CODE_KEY = (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.responseCodeKey) || "code";
                RESPONSE_MESSAGE_KEY = (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.responseMessageKey) || "message";
                RESPONSE_DATA_KEY = (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.responseDataKey) || "data";
                _a = API, _b = "" + namespace + firstUpperCase(action), request = _a[_b];
                return [4 /*yield*/, request(params)];
            case 1:
                r = _h.sent();
                if (r instanceof Error && r.stack && r.message) {
                    if (onError)
                        onError(r);
                    return [2 /*return*/, message.error(r.message)];
                }
                _c = r, status = _c.status, _d = _c.data, _e = RESPONSE_CODE_KEY, code = _d[_e], _f = RESPONSE_MESSAGE_KEY, msg = _d[_f], _g = RESPONSE_DATA_KEY, responseData = _d[_g];
                if (status !== HTTP_SUCCESS_CODE ||
                    (code !== RESPONSE_SUCCESS_CODE && !ignoreResponseCode)) {
                    return [2 /*return*/, message.error(msg)];
                }
                if (!silentMessage) {
                    message.success((TEXT[firstUpperCase(action)] || "操作") + "\u6210\u529F");
                }
                if (onSuccess) {
                    onSuccess(responseData, r);
                }
                return [2 /*return*/];
        }
    });
}); };
export var REQUEST_MANUAL = function (API, namespace, action, onSuccess) {
    return function (payload) {
        return REQUEST(API, namespace, action, payload, onSuccess);
    };
};
