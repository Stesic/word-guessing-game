import React from "react";

import "./ReloadButton.style.css";

type Props = {
  handleClick: () => void;
};

function ReloadButton({ handleClick }: Props) {
  return (
    <div onClick={handleClick} className="reloadButton">
      <i
        className="fa fa-refresh "
        style={{
          fontSize: "48px",
        }}
      ></i>
    </div>
  );
}

export default ReloadButton;
