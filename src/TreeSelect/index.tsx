import React, { FunctionComponent } from "react";
// import { TreeSelect } from "leap-ui";
import { TreeSelect } from "antd";

const TreeSelect2: FunctionComponent = ({ onChange, ...props }) => {
  const onChange1 = (value, label, extra) => {
    onChange(value, label, extra);
    console.log(extra.triggerNode.props);
  };
  return <TreeSelect onChange={onChange1} {...props} />;
};

export { TreeSelect2 as TreeSelect };
