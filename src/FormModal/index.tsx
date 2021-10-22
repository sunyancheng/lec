import React, { FunctionComponent, createRef } from "react";
import { Modal, Button, Spin } from "leap-ui";
import { FormComponentProps } from "antd/es/form";
import { LeForm, LeEnhancedForm } from "../Form";
import styles from "./style.less";
import { REQUEST } from "../utils/request";

interface FormModalProps extends FormComponentProps {
  title: string;
  namespace: string;
  loading: boolean;
  visible: boolean;
  pageType?: "edit" | "detail";
  API: { [key: string]: Function };
  onCancel: () => void;
  className?: string;
  model: { [key: string]: string };
  submitOptions: {
    beforeSubmit?: Function;
    action: string;
    payload:
      | Function
      | {
          [key: string]: string | boolean;
        };
    onSuccess: Function;
  };
  formOptions: {};
  singleClose?: boolean;
}
const FormModal: FunctionComponent<FormModalProps> = ({
  title,
  visible,
  onCancel,
  className,
  model,
  namespace,
  API,
  formOptions,
  submitOptions,
  loading: saveLoading,
  singleClose,
  pageType,
  ...props
}) => {
  const formRef = createRef<Form>();

  const Form =
    pageType === "edit" || pageType === "detail" ? LeEnhancedForm : LeForm;

  const handleSubmit = () => {
    formRef.current.validateSubmit().then((model) => {
      const { action, payload, onSuccess, beforeSubmit } = submitOptions;

      const submit = () =>
        REQUEST(
          API,
          namespace,
          action,
          typeof payload === "function" ? payload(model) : payload,
          (respData, resp) => {
            onCancel();
            if (onSuccess) {
              onSuccess(respData, resp);
            }
          }
        );

      if (typeof beforeSubmit === "function") {
        if (beforeSubmit(model, formRef.current) === true) {
          submit();
        }
      } else {
        submit();
      }
    });
  };

  return (
    <Modal
      maskClosable={false}
      visible={visible}
      onCancel={onCancel}
      title={title}
      width={1200}
      className={styles.FormModal}
      centered
      footer={
        singleClose ? (
          <Button type="primary" onClick={onCancel}>
            关闭
          </Button>
        ) : (
          <>
            <Button onClick={onCancel}>取消</Button>
            <Button type="primary" onClick={handleSubmit} loading={saveLoading}>
              确定
            </Button>
          </>
        )
      }
      {...props}
    >
      <Spin spinning={false}>
        <Form
          wrappedComponentRef={formRef}
          style={{ width: "100%" }}
          className={className}
          model={model}
          {...formOptions}
        >
          <div className="midRow">
            <Button type="primary">确定</Button>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export { FormModal };
