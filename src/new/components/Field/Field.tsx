import React, { useEffect, useRef, useState } from "react";

import "./Field.style.css";
import { EGameStatus } from "../../../types";

type Props = {
  value?: any;
  name?: string;
  gameStatus?: EGameStatus;
  correctValue?: boolean;
  misplacedValue?: boolean;
  nameOfClass?: string | null;
};

function Field({
  value,
  name,
  gameStatus,
  correctValue,
  misplacedValue,
  nameOfClass,
}: Props) {
  const classes = gameStatus === EGameStatus.Submited ? nameOfClass : "regular";

  return (
    <div
      // onMouseOver={() => {
      //   console.log(misplacedValue, "mislplaced value");
      // }}
      className={`base ${classes}`}
    >
      {value}
    </div>
  );
}

export default React.memo(Field);
