import React, { FunctionComponent } from "react";
import { Select } from "leap-ui";
import { FormItemProps, SelectKeyValueProps } from "../types/form";

const { Option } = Select;

export interface LeSelectProps extends FormItemProps {
  showAll?: boolean;
  defaultOptionValue?: string | number | undefined;
  defaultOptionLabel?: string;
}

export const LeSelect: FunctionComponent<LeSelectProps> = ({
  placeholder,
  optionLabelKey = "label",
  optionValueKey = "value",
  values = [],
  showAll,
  defaultOptionValue = undefined,
  defaultOptionLabel = "全部",
  ...props
}) => (
  <Select placeholder={placeholder} {...props}>
    {showAll && (
      <Option key={defaultOptionValue} value={defaultOptionValue}>
        {defaultOptionLabel}
      </Option>
    )}
    {values.map(({ [optionLabelKey]: label, [optionValueKey]: value }: SelectKeyValueProps) => (
      <Option key={value} value={value}>
        {label}
      </Option>
    ))}
  </Select>
);
