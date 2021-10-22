import { FunctionComponent } from "react";
import { FormComponentProps } from "antd/es/form";
import { SelectProps } from "antd/lib/select";

export interface FilterCriterialProps {
  [key: string]: any;
}

export interface FilterGroupProps extends FormComponentProps {
  onSubmit: (criterial: FilterCriterialProps) => void; // 提交
  filters?: Array<FilterProps> | FilterGroupFiltersProps;
}

export interface FilterGroupFiltersProps {
  data: Array<FilterProps>;
  manualSearch?: boolean;
}

export interface FilterKeyValueProps {
  value: number | string;
  // key: number | string;
  label: number | string;
  [key: string]: number | string;
}

export interface FilterSearchInputProps extends FilterProps {
  onSubmit: () => void;
}

export interface FilterProps extends SelectProps {
  placeholder?: string;
  type?: string;
  values?: Array<FilterKeyValueProps>;
  label?: string;
  id: string;
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
  component?: FunctionComponent;
}
