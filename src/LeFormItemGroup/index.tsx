import React, { FunctionComponent } from "react";
import classNames from "classnames";
import { Form, Row, Col } from "leap-ui";
import { FormItemProps, FormModelProps } from "../types/form";
import { rulesGenerator } from "../utils";
import styles from "./style.less";
export interface ItemProps {
  id: string | number;
  label?: string;
  initialValue: any;
  rules: {}[];
  decorator: { [key: string]: string };
  advRules: {}[];
  hidden: boolean;
  render: Function;
  modelToValue: Function;
}

export interface LeFormItemGroupProps {
  className?: string;
  label?: string;
  items?: Array<FormItemProps>;
  model: FormModelProps;
  getFieldDecorator: Function;
  getElement: Function;
  form: any;
  wrapperCol?: {};
  labelCol?: {};
}

export const LeFormItemGroup: FunctionComponent<LeFormItemGroupProps> = ({
  label,
  labelCol,
  wrapperCol,
  items,
  getElement,
  getFieldDecorator,
  model,
  className,
  form,
  ...props
}) => (
  <Row className={classNames("ant-form-item", styles.formItemGroup, className)}>
    {label && (
      <Col xs={{ span: 24 }} sm={{ span: 4 }} {...labelCol} className="ant-form-item-label">
        <label>{label}</label>
      </Col>
    )}
    <Col
      xs={{ span: 24 }}
      sm={{ span: 20 }}
      {...wrapperCol}
      className="ant-form-item-control-wrapper"
    >
      {items.map((item, index: number) => {
        const {
          id,
          label,
          initialValue,
          rules,
          decorator,
          advRules,
          hidden,
          modelToValue,
          className: itemClassName,
          labelCol: formItemLabelCol,
          wrapperCol: formItemWrapperCol,
        } = item;
        return (
          <Form.Item
            label={label}
            key={index}
            className={classNames(itemClassName, { hidden })}
            labelCol={formItemLabelCol}
            wrapperCol={formItemWrapperCol}
          >
            {getFieldDecorator(id, {
              validateTrigger: ["onChange"],
              initialValue:
                model && model[id] !== undefined
                  ? modelToValue
                    ? modelToValue(model[id], model)
                    : model[id]
                  : initialValue,
              rules: rulesGenerator(label, rules, advRules),
              ...decorator,
            })(item.render ? item.render({ form }) : getElement({ ...item, getFieldDecorator }))}
            {item.suffix ? <span className="ant-form-text"> {item.suffix}</span> : null}
          </Form.Item>
        );
      })}
      {props.suffix ? <div className="ant-row ant-form-item"> {props.suffix}</div> : null}
    </Col>
  </Row>
);
