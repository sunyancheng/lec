import { message } from "leap-ui";

const TEXT = {
  Create: "新建",
  Update: "修改",
  Delete: "删除",
  Release: "发布",
};

const firstUpperCase = (str: string) => {
  return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
};

export interface APIProps {
  [key: string]: Function;
}

export interface PayloadProps {
  [key: string]: string | boolean | Function;
}

export interface TEXT_PROPS {
  Create: string;
  Update: string;
  Delete: string;
  Release: string;
}

export const REQUEST = async (
  API: APIProps,
  namespace: string,
  action: string,
  payload: PayloadProps,
  onSuccess?: Function,
  onError?: Function
) => {
  const {
    ignoreResponseCode,
    silentMessage,
    responseError,
    requestOptions,
    ...params
  } = payload;

  const HTTP_SUCCESS_CODE = requestOptions?.httpSuccessCode || 200;

  const RESPONSE_SUCCESS_CODE = requestOptions?.responseSuccessCode || 0;

  const RESPONSE_CODE_KEY = requestOptions?.responseCodeKey || "code";

  const RESPONSE_MESSAGE_KEY = requestOptions?.responseMessageKey || "message";

  const RESPONSE_DATA_KEY = requestOptions?.responseDataKey || "data";

  const { [`${namespace}${firstUpperCase(action)}`]: request } = API;

  const r = await request(params);

  if (r instanceof Error && r.stack && r.message) {
    if (onError) onError(r);
    return message.error(r.message);
  }

  const {
    status,
    data: {
      [RESPONSE_CODE_KEY]: code,
      [RESPONSE_MESSAGE_KEY]: msg,
      [RESPONSE_DATA_KEY]: responseData,
    },
  } = r;

  if (
    status !== HTTP_SUCCESS_CODE ||
    (code !== RESPONSE_SUCCESS_CODE && !ignoreResponseCode)
  ) {
    return message.error(msg);
  }

  if (!silentMessage) {
    message.success(
      `${TEXT[firstUpperCase(action) as keyof TEXT_PROPS] || "操作"}成功`
    );
  }

  if (onSuccess) {
    onSuccess(responseData, r);
  }
};

export const REQUEST_MANUAL = (
  API: APIProps,
  namespace: string,
  action: string,
  onSuccess: Function
) => {
  return (payload: PayloadProps) =>
    REQUEST(API, namespace, action, payload, onSuccess);
};
