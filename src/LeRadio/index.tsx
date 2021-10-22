import React, { FunctionComponent } from "react";
import { Radio } from "leap-ui";
import { FormItemProps } from "../types/form";

export const LeRadio: FunctionComponent<FormItemProps> = ({
  optionLabelKey = "label",
  optionValueKey = "value",
  values = [],
  ...props
}) => (
  <Radio.Group style={{ width: "100%" }} {...props}>
    {values.map(({ [optionLabelKey]: label, [optionValueKey]: value }, index) => (
      <Radio value={value} key={index}>
        {label}
      </Radio>
    ))}
  </Radio.Group>
);
