import { FunctionComponent } from "react";
import { FormComponentProps } from "antd/es/form";

export interface FormValuesProps {
  [key: string]: any;
}

export interface FormProps extends FormComponentProps {
  mode: string;
  layout: "horizontal" | "inline" | "vertical" | undefined;
  className: string;
  model: { [key: string]: string };
  onSubmit: (criterial: FormValuesProps) => void; // 提交
  models?:
    | Array<FormItemProps>
    | {
        data: Array<FormItemProps>;
        manualSearch: boolean;
        manualReset: boolean;
      };
  onValuesChange: (props: any, changedValues: any, allValues: any) => void;
}

export interface SelectKeyValueProps {
  value: number | string;
  label: number | string;
  [key: string]: number | string;
}

export interface FormItemProps {
  handleSearch?: Function;
  readOnly: boolean;
  placeholder?: string;
  type?: string;
  values?: Array<SelectKeyValueProps>;
  label?: string;
  id?: string;
  key?: string;
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
  className?: string;
  mode?: string;
  value: any;
  derived: Function;
  component?: FunctionComponent;
}
