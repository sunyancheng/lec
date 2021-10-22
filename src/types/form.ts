import { FunctionComponent } from "react";
import { FormComponentProps } from "antd/es/form";

export interface FormValuesProps {
  [key: string]: any;
}

export interface FormProps extends FormComponentProps {
  onSubmit: (criterial: FormValuesProps) => void; // 提交
  models?: Array<FormItemProps>;
}

export interface SelectKeyValueProps {
  value: number | string;
  label: number | string;
  [key: string]: number | string;
}

export interface FormItemProps {
  placeholder?: string;
  type?: string;
  values?: Array<SelectKeyValueProps>;
  label?: string;
  id: string;
  key?: string | number;
  optionValueKey?: string | "value";
  optionLabelKey?: string | "label";
  getFieldDecorator?: any;
  options?: {
    getValueFromEvent?: () => {};
    initialValue?: boolean | number | string | Array<number | string>;
    normalize?: string;
    preserve?: string;
    rules?: [];
    trigger?: string;
    validateFirst?: boolean;
    validateTrigger?: string;
    valuePropName?: string;
  };
  initialValue?: any;
  rules?: never[];
  modelToValue?: Function;
  component?: FunctionComponent;
  decorator?: Function;
  hidden?: boolean;
  advRules?: {};
  render?: Function;
  labelCol?: {};
  wrapperCol?: {};
  className?: string;
}

export interface FormModelProps {
  [key: string]: string;
}
