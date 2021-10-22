import React, { FunctionComponent, useRef } from "react";
import { Checkbox } from "antd";
import { FormItemProps } from "../types/form";

export interface LeCheckboxProps extends FormItemProps {
  showAll: boolean;
  allCheckedValue: never;
  onChange: Function;
  value: any;
  disabled: boolean;
}

export const LeCheckbox: FunctionComponent<LeCheckboxProps> = ({
  optionLabelKey = "label",
  optionValueKey = "value",
  values = [],
  showAll = true,
  allCheckedValue,
  onChange,
  value,
  disabled,
}) => {
  const prevValue = useRef([]);
  const allValues = values.map((item) => item[optionValueKey]);
  const onChange1 = (value: any) => {
    if (allValues.every((v) => value.includes(v))) {
      if (prevValue.current.includes(allCheckedValue)) {
        prevValue.current = [];
        return onChange([]);
      }
      prevValue.current = [allCheckedValue, ...allValues];
      return onChange([allCheckedValue, ...allValues]);
    }

    if (value.includes(allCheckedValue)) {
      if (value[value.length - 1] === allCheckedValue) {
        prevValue.current = [allCheckedValue, ...allValues];
        return onChange([allCheckedValue, ...allValues]);
      }
      prevValue.current = value.filter((v: number | string) => v !== allCheckedValue);
      return onChange([...value.filter((v: number | string) => v !== allCheckedValue)]);
    }

    prevValue.current = value;
    return onChange(value);
  };

  return (
    <Checkbox.Group
      onChange={onChange1}
      style={{ width: "100%" }}
      value={value}
      disabled={disabled}
    >
      {showAll && (
        <Checkbox value={allCheckedValue} key="ALL_CHECK_KEY">
          全部
        </Checkbox>
      )}
      {values.map(({ [optionLabelKey]: label, [optionValueKey]: value }, index) => (
        <Checkbox value={value} key={index}>
          {label}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
};
