import React from "react";

import "./Field.style.css";
import { ECharStatus, EGameStatus } from "../../types";

type Props = {
  value: string;
  gameStatus: EGameStatus;
  nameOfClass: ECharStatus | null;
};

function Field({ value, gameStatus, nameOfClass }: Props) {
  const classes = gameStatus === EGameStatus.Submited ? nameOfClass : "regular";

  return (
    <div className={`base ${classes} `}>
      <span className={value && "line-up"}>{value}</span>
    </div>
  );
}

export default React.memo(Field);
