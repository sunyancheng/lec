import { InputNumber } from "leap-ui";
import React, { FunctionComponent } from "react";
import styles from "./style.less";

const StageItem = ({
  start = 0,
  end = 60,
  readOnly,
  index,
  total,
  onChange,
  startLabel,
  endLabel,
}) => {
  return (
    <div className={styles.stageItem}>
      <span className="order">{index + 1}</span>
      <div>
        {startLabel}
        {index > 0 ? (
          readOnly ? (
            <span>{start}</span>
          ) : (
            <InputNumber value={start} onChange={(value) => onChange(index, 0, value)} />
          )
        ) : (
          start
        )}
      </div>
      <div>
        {endLabel}
        {index + 1 < total ? (
          readOnly ? (
            <span>{end}</span>
          ) : (
            <InputNumber
              disabled={readOnly}
              value={end}
              onChange={(value) => onChange(index, 1, value)}
            />
          )
        ) : (
          end
        )}
      </div>
    </div>
  );
};

export const Stage: FunctionComponent = ({
  start,
  end,
  value: stages = [[start, end]],
  onChange,
  startLabel,
  endLabel,
  readOnly,
}) => {
  const onChange1 = (stageIndex, index, value) => {
    const newStages = stages.map((item, i) => {
      // 修改对应值
      if (i === stageIndex) {
        item[index] = value;
      }

      // 修改 end 下一个 start 联动
      if (index === 1 && i === stageIndex + 1) {
        item[0] = value + 1;
      }

      // 修改 start 上一个 end 联动
      if (index === 0 && i === stageIndex - 1) {
        item[1] = value - 1;
      }

      return item;
    });

    onChange(newStages);
  };

  return (
    <div className={styles.Stage}>
      {stages.map(([s, e], index) => (
        <StageItem
          key={index}
          index={index}
          start={s}
          end={e}
          readOnly={readOnly}
          total={stages.length}
          onChange={onChange1}
          startLabel={startLabel}
          endLabel={endLabel}
        />
      ))}
    </div>
  );
};
