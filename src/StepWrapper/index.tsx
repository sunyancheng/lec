import React, { FunctionComponent, useEffect, useState } from "react";
import { Steps } from "leap-ui";
import styles from "./style.less";

const { Step } = Steps;

export const StepWrapper: FunctionComponent = ({
  steps,
  disabled,
  step = 0,
}) => {
  const [current, setCurrentStep] = useState(step);

  const onChange = (current: number) => {
    setCurrentStep(current);
  };

  useEffect(() => {
    setCurrentStep(step);
  }, [step]);

  return (
    <div className={styles.StepWrapper}>
      <Steps
        style={{ width: "50%", margin: "0 auto 20px" }}
        labelPlacement="vertical"
        size="small"
        current={current}
        onChange={disabled ? undefined : onChange}
      >
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div>{steps[current].content}</div>
    </div>
  );
};
