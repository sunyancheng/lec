import React, {
  FunctionComponent,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { LeForm } from "../Form";
import styles from "./style.less";

import { FilterGroupProps } from "./types";

const Filters: FunctionComponent<FilterGroupProps> = forwardRef(
  ({ filters = [], onSubmit }, wrappedComponentRef) => {
    const formRef = useRef(null);

    useImperativeHandle(wrappedComponentRef, () => formRef.current);

    return (
      <LeForm
        wrappedComponentRef={formRef}
        mode="filter"
        models={filters}
        labelCol={undefined}
        wrapperCol={undefined}
        className={styles["filterBar"]}
        onSubmit={onSubmit}
      />
    );
  }
);

export { Filters };
