import React, { FunctionComponent } from "react";
import { Select } from "leap-ui";
import { FilterProps, FilterKeyValueProps } from "../Filters/types";

const { Option } = Select;

export const LeMultipleSelect: FunctionComponent<FilterProps> = ({
  placeholder,
  optionLabelKey = "label",
  optionValueKey = "value",
  maxTagCount = 1,
  values = [],
  ...props
}) => (
  <Select placeholder={placeholder} mode="multiple" maxTagCount={maxTagCount} {...props}>
    {values.map(({ [optionLabelKey]: label, [optionValueKey]: value }: FilterKeyValueProps) => (
      <Option key={value} value={value}>
        {label}
      </Option>
    ))}
  </Select>
);
