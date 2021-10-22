import React, { useImperativeHandle, FunctionComponent, forwardRef } from "react";
import { Form, Select, Input, Button, DatePicker } from "leap-ui";
import { getPureObject } from "../utils";
import styles from "./style.less";

import {
  FilterGroupProps,
  FilterSearchInputProps,
  FilterProps,
  FilterKeyValueProps,
} from "./types";

const { Option } = Select;

const SimpleDatePicker: FunctionComponent<FilterProps> = ({
  label,
  placeholder,
  id,
  getFieldDecorator,
}) => (
  <Form.Item label={label}>
    {getFieldDecorator(id)(<DatePicker placeholder={placeholder} />)}
  </Form.Item>
);

const MultipleSelect: FunctionComponent<FilterProps> = ({
  label,
  placeholder,
  id,
  optionLabelKey = "label",
  optionValueKey = "value",
  maxTagCount = 1,
  values = [],
  getFieldDecorator,
}) => (
  <Form.Item label={label}>
    {getFieldDecorator(id)(
      <Select placeholder={placeholder} mode="multiple" maxTagCount={maxTagCount}>
        {values.map(({ [optionLabelKey]: label, [optionValueKey]: value }: FilterKeyValueProps) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>,
    )}
  </Form.Item>
);
const SimpleSelect: FunctionComponent<FilterProps> = ({
  label,
  placeholder,
  id,
  optionLabelKey = "label",
  optionValueKey = "value",
  values = [],
  getFieldDecorator,
}) => (
  <Form.Item label={label}>
    {getFieldDecorator(id)(
      <Select placeholder={placeholder}>
        <Option value={""}>全部</Option>
        {values.map(({ [optionLabelKey]: label, [optionValueKey]: value }: FilterKeyValueProps) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>,
    )}
  </Form.Item>
);

const SimpleInput: FunctionComponent<FilterSearchInputProps> = ({
  label,
  placeholder,
  id,
  getFieldDecorator,
  onSubmit,
}) => (
  <Form.Item label={label}>
    {getFieldDecorator(id)(<Input.Search placeholder={placeholder} onSearch={onSubmit} />)}
  </Form.Item>
);

const FilterForm: FunctionComponent<FilterGroupProps> = forwardRef(
  ({ form, filters = [], onSubmit }, wrappedComponentRef) => {
    useImperativeHandle(wrappedComponentRef, () => ({
      form,
    }));

    const { getFieldDecorator } = form;

    const manualSearch = Array.isArray(filters) ? false : filters?.manualSearch;

    const getElement = ({ type = "input", component, ...props }: FilterProps) => {
      if (component) return component({ ...props, getFieldDecorator });
      if (type === "input")
        return (
          <SimpleInput
            {...props}
            getFieldDecorator={getFieldDecorator}
            onSubmit={() => onSubmit(getPureObject(form.getFieldsValue()))}
          />
        );
      if (type === "select")
        return <SimpleSelect {...props} getFieldDecorator={getFieldDecorator} />;
      if (type === "multipleSelect")
        return <MultipleSelect {...props} getFieldDecorator={getFieldDecorator} />;
      if (type === "datePicker")
        return <SimpleDatePicker {...props} getFieldDecorator={getFieldDecorator} />;
      return null;
    };

    return (
      <Form
        // layout="inline"
        hideRequiredMark
        style={{ width: "100%" }}
        className={styles["filterBar"]}
      >
        {(Array.isArray(filters) ? filters : filters.data).map(getElement)}
        {manualSearch && (
          <Form.Item label=" ">
            <Button
              type="primary"
              onClick={() => {
                onSubmit(form.getFieldsValue());
              }}
            >
              查询
            </Button>
          </Form.Item>
        )}
      </Form>
    );
  },
);

const FilterGroup = Form.create<FilterGroupProps>({
  onValuesChange: (props, _, allValues) => {
    const manualSearch = Array.isArray(props.filters) ? false : props.filters?.manualSearch;
    if (props.onSubmit && !manualSearch) props.onSubmit(allValues);
  },
})(FilterForm);

export { FilterGroup };
