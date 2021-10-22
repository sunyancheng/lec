import React, { FunctionComponent } from "react";
import { LeForm } from "./Form";
import useRequest from "@luban-hooks/use-request";

export interface LeEnhancedFormProps {
  namespace: string;
  API: {
    [key: string]: Function;
  };
  defaultParams?: {
    [key: string]: string;
  };
  requestOptions?: {
    [key: string]: string;
  };
}

export const LeEnhancedForm: FunctionComponent<LeEnhancedFormProps> = (
  props
) => {
  const { namespace, API, defaultParams, requestOptions } = props;

  const { data: model } = useRequest(API[`${namespace}Retrieve`], {
    defaultParams: defaultParams || {},
    formatter: (res) => res.data.data,
    ...requestOptions,
  });

  return <LeForm {...props} model={model} />;
};
