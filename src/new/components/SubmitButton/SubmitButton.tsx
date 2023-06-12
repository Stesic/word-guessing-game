import React from "react";

import "./SubmitButton.style.css";

type Props = {
  handleClick: any;
  disabled?: boolean;
};
function SubmitButton({ handleClick, disabled }: Props) {
  return (
    <div
      onClick={() => {
        if (disabled) return;
        handleClick();
      }}
      className={`submit-btn slide ${disabled && "disabled"}`}
    >
      Proveri
    </div>
  );
}

export default SubmitButton;
