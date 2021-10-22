import classNames from "classnames";
import { Icon, Input, Tooltip } from "leap-ui";
import React, { CSSProperties, FunctionComponent, ReactNode } from "react";
import styles from "./index.less";

export interface CustomSelectBoxProps {
  className?: CSSProperties | string;
  showValue?: string | ReactNode; // 显示在控制栏的内容
  onClear?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void; // 清除功能
  onOpen?: () => void; // 点击展开抽屉
  disabled?: boolean;
  style?: CSSProperties;
  placeholder?: string;
  tooltipTitle?: ReactNode | string;
}

export const CustomSelectBox: FunctionComponent<CustomSelectBoxProps> = ({
  disabled,
  showValue,
  onClear,
  onOpen,
  style = {},
  placeholder = "",
  className = "",
  tooltipTitle,
}) => {
  return (
    <Tooltip
      title={tooltipTitle}
      overlayClassName={styles["customSelectBoxTip"]}
      className={styles["customSelectBoxContent"]}
      style={{ maxWidth: "auto" }}
    >
      <Input
        className="customSelectBoxInput"
        onKeyDown={(e) => {
          if (e.keyCode === 40) {
            return !disabled && onOpen && onOpen();
          }
        }}
      />
      <div
        className={classNames(`customElementBox ${styles["customSelectBox"]} ${className}`, {
          disabled,
        })}
        style={style}
      >
        <div
          className={showValue ? "text" : "placeholder"}
          onClick={() => !disabled && onOpen && onOpen()}
        >
          {showValue || placeholder || "请选择"}
        </div>

        <Icon type="down" />
        {!!showValue && (
          <Icon
            className="close"
            type="close-circle"
            theme="filled"
            onClick={(e) => onClear && onClear(e)}
          />
        )}
      </div>
    </Tooltip>
  );
};
