import React, { FunctionComponent } from "react";
import { Form } from "leap-ui";
import { FormItemProps } from "../types/form";

export const FormItemText: FunctionComponent<FormItemProps> = ({
  label,
  value,
}) => (
  <Form.Item label={label}>
    <span className="ant-form-text">{value}</span>
  </Form.Item>
);
