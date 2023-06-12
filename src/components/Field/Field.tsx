import React from "react";

import "./Field.style.css";
import { EGameStatus } from "../../types";

type Props = {
  value?: any;
  gameStatus?: EGameStatus;
  nameOfClass?: string | null;
};

function Field({ value, gameStatus, nameOfClass }: Props) {
  const classes = gameStatus === EGameStatus.Submited ? nameOfClass : "regular";

  return (
    <div className={`base ${classes} `}>
      <span className={value && "lineUp"}>{value}</span>
    </div>
  );
}

export default React.memo(Field);
