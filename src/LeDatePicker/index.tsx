import React, { FunctionComponent } from "react";
import { DatePicker } from "leap-ui";

export const LeDatePicker: FunctionComponent = ({ mode, ...props }) => {
  const DPicker = mode ? DatePicker[mode] : DatePicker;
  return <DPicker {...props} />;
};
