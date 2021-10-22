import React, {
  useImperativeHandle,
  FunctionComponent,
  forwardRef,
} from "react";
import { Form, Button, InputNumber } from "leap-ui";
import { Input } from "antd";
import styles from "./style.less";

import { rulesGenerator } from "../utils";

import { FormProps, FormItemProps } from "./types";

import classNames from "classnames";

import { LeSelect } from "../LeSelect";

import { LeRadio } from "../LeRadio";

import { LeCheckbox } from "../LeCheckbox";

import { LeFormItemGroup } from "../LeFormItemGroup";

import { LeMultipleSelect } from "../LeMultipleSelect";

import { LeDatePicker } from "../LeDatePicker";

import { LeTimePicker } from "../LeTimePicker";

import { LeCascader } from "../LeCascader";

export const processModel = (models, values) => {
  // 提交前待处理的 model

  const itemsModels = models
    .filter((m) => m.type === "formItemGroup")
    .reduce((p, c) => [...p, ...c.items], []);

  const processedModel = [...models, ...itemsModels].filter(
    (m) => m.valueToModel
  );

  if (processedModel.length > 0) {
    return processedModel.reduce((p, { id, valueToModel }) => {
      return { ...p, ...valueToModel(id, values[id]) };
    }, values);
  }
  return values;
};

export const processValuesBeforeSubmit = (models, values, onSubmit) => {
  const processedValues = processModel(models, values);
  onSubmit(processedValues);
};

const StaticText = (props: FormItemProps) => (
  <span className="ant-form-text">{props.value}</span>
);

const getElement = ({
  type = "input",
  component,
  options = {},
  ...props
}: FormItemProps) => {
  if (props.readOnly) return <StaticText {...props} />;

  if (component) return component;

  if (type === "br") return <Form.Item style={{ width: "100%" }}></Form.Item>;

  if (type === "datePicker") return <LeDatePicker {...props} />;

  if (type === "timePicker") return <LeTimePicker {...props} {...options} />;

  if (type === "cascader") return <LeCascader {...props} {...options} />;

  if (type === "multipleSelect") return <LeMultipleSelect {...props} />;

  if (type === "textArea")
    return <Input.TextArea placeholder={props.placeholder} {...props} />;

  if (type === "input") {
    const Component = props.mode ? Input[props.mode] : Input;
    if (props.mode === "Search") props.onSearch = props.handleSearch;
    return <Component placeholder={props.placeholder} {...props} />;
  }

  if (type === "select") return <LeSelect {...props} />;

  if (type === "checkbox") return <LeCheckbox {...props} />;

  if (type === "radio") return <LeRadio {...props} />;

  if (type === "inputNumber")
    return <InputNumber placeholder={props.placeholder} {...props} />;

  return null;
};

const FilterForm: FunctionComponent<FormProps> = forwardRef(
  (
    {
      form,
      mode = "form",
      models = [],
      model: modelItem = {},
      onSubmit,
      layout,
      className,
      ...props
    },
    wrappedComponentRef
  ) => {
    const validateSubmit = () => {
      return new Promise((resolve, reject) => {
        form.validateFields((errors, values) => {
          if (errors) reject();
          resolve(
            processModel(Array.isArray(models) ? models : models.data, values)
          );
        });
      });
    };

    useImperativeHandle(wrappedComponentRef, () => ({
      form,
      validateSubmit,
    }));

    const { getFieldDecorator } = form;

    const manualSearch = Array.isArray(models) ? false : models?.manualSearch;

    const manualReset = Array.isArray(models) ? false : models?.manualReset;

    const model = (
      Array.isArray(models)
        ? models
        : Array.isArray(models.data)
        ? models.data
        : []
    )
      .filter((m) => m.derived)
      .reduce((r, c) => {
        return { ...r, [c.id]: c.derived(modelItem) };
      }, modelItem);

    const resetFilters = () => {
      form.resetFields();
    };

    const handleSearch = () => {
      const modelsList = Array.isArray(models) ? models : models?.data;

      processValuesBeforeSubmit(modelsList, form.getFieldsValue(), onSubmit);
    };

    return (
      <Form
        layout={layout}
        hideRequiredMark
        labelCol={{
          xs: { span: 24 },
          sm: { span: 4 },
        }}
        wrapperCol={{
          xs: { span: 24 },
          sm: { span: 16 },
        }}
        className={classNames(
          styles.Form,
          //{ /*[styles.filterMode] : mode === 'filters',*/ [styles.formMode]: mode === "form" },
          className
        )}
        {...props}
      >
        {(Array.isArray(models) ? models : models.data).map(
          (
            {
              type,
              label,
              id,
              renderItem,
              values,
              rules,
              initialValue,
              decorator = {},
              render,
              advRules,
              hidden,
              modelToValue,
              ...modelProps
            },
            index
          ) => {
            const { className: modelClassName, ...restModelProps } = modelProps;
            return type === "formItemGroup" ? (
              <LeFormItemGroup
                key={index}
                label={label}
                getElement={getElement}
                model={model}
                form={form}
                {...modelProps}
                getFieldDecorator={getFieldDecorator}
              />
            ) : renderItem ? (
              renderItem({ form })
            ) : (
              <Form.Item
                key={index}
                label={label}
                className={classNames({ hidden }, modelClassName)}
                {...restModelProps}
              >
                {getFieldDecorator(id, {
                  validateTrigger: ["onChange"],
                  rules: rulesGenerator(label, rules, advRules),
                  initialValue:
                    model && model[id] !== undefined
                      ? modelToValue
                        ? modelToValue(model[id], model)
                        : model[id]
                      : initialValue,
                  ...decorator,
                })(
                  render
                    ? render({ form })
                    : getElement({
                        ...restModelProps,
                        values,
                        type,
                        handleSearch,
                      })
                )}
                {restModelProps.suffix ? (
                  <span className="ant-form-text">{restModelProps.suffix}</span>
                ) : null}
              </Form.Item>
            );
          }
        )}
        {manualSearch && (
          <Form.Item label=" " className="search-button-list">
            <Button type="primary" onClick={handleSearch}>
              查询
            </Button>
            {manualReset && (
              <Button type="default" onClick={resetFilters}>
                重置
              </Button>
            )}
          </Form.Item>
        )}
      </Form>
    );
  }
);

const Form2 = Form.create<FormProps>({
  onValuesChange: (props, changedValues, allValues) => {
    const { onValuesChange, models, onSubmit } = props;
    if (onValuesChange) {
      onValuesChange(props, changedValues, allValues);
    }

    const modelsList = Array.isArray(models) ? models : models?.data;

    const manualSearch = Array.isArray(models) ? false : models?.manualSearch;

    if (onSubmit && !manualSearch)
      processValuesBeforeSubmit(modelsList, allValues, onSubmit);
  },
})(FilterForm);

export { Form2 as LeForm };
