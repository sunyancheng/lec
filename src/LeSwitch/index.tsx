import React, { FunctionComponent } from "react";
import { Switch } from "leap-ui";
import { FormItemProps } from "../types/form";

export const LeSwitch: FunctionComponent<FormItemProps> = ({ values = [], ...props }) => (
  <Switch size="small" checkedChildren="启用" unCheckedChildren="停用" {...props} />
);
