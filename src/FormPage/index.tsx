import React, {
  FunctionComponent,
  createRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { LeForm, LeEnhancedForm } from "../Form";
import { Button } from "leap-ui";
import { REQUEST } from "../utils/request";
import { useHistory } from "luban-router";
import { FormProps } from "../Form/types";
import styles from "./style.less";

const Footer = ({ children }) => {
  return <div className={styles.Footer}>{children}</div>;
};

export interface FormPageProps {
  footer?: [];
  namespace: string;
  pageType: "edit" | "detail";
  formOptions: FormProps;
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
  API: {};
  onCancel: Function;
}

export const FormPage: FunctionComponent<FormPageProps> = forwardRef(
  (
    { footer, namespace, pageType, formOptions, submitOptions, API, onCancel },
    formPageRef
  ) => {
    const formRef = createRef<Form>();

    useImperativeHandle(formPageRef, () => ({
      ...formRef?.current,
    }));

    const handleSubmit = () => {
      formRef.current.validateSubmit().then((model) => {
        const { action, payload, onSuccess, beforeSubmit } = submitOptions;

        const submit = () => {
          REQUEST(
            API,
            namespace,
            action,
            typeof payload === "function" ? payload(model) : payload,
            (responseData, response) => {
              if (onSuccess) {
                onSuccess(responseData, response);
              }
            }
          );
        };

        if (typeof beforeSubmit === "function") {
          if (beforeSubmit(model, formRef.current) === true) {
            submit();
          }
        } else {
          submit();
        }
      });
    };

    const defaultBtn = [
      {
        title: "取消",
        type: "default",
        onClick: () => {
          if (onCancel) {
            onCancel();
          }
        },
      },
      {
        title: "保存",
        type: "primary",
        onClick: handleSubmit,
      },
    ];

    const Form =
      pageType === "edit" || pageType === "detail" ? LeEnhancedForm : LeForm;

    const history = useHistory();

    return (
      <>
        <Form
          namespace={namespace}
          wrappedComponentRef={formRef}
          API={API}
          {...formOptions}
        />
        <Footer>
          {(Array.isArray(footer) ? footer : defaultBtn).map((btn, i) => (
            <Button
              key={i}
              type={btn.type}
              onClick={() =>
                btn.navigator
                  ? history.push(btn.navigator)
                  : btn.onClick(formRef.current)
              }
              disabled={btn.disabled}
            >
              {btn.title}
            </Button>
          ))}
        </Footer>
      </>
    );
  }
);
