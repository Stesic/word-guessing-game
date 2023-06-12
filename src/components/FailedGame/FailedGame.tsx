import React from "react";
import StartNewGame from "../StartNewGame/StartNewGame";

type Props = {
  handleStartNewGame: any;
};

function FailedGame({ handleStartNewGame }: Props) {
  return (
    <div className="container">
      <img
        width={250}
        height={250}
        src="/images/betterLuck.svg"
        alt="better-luck"
      />
      <StartNewGame handleClick={handleStartNewGame} />
    </div>
  );
}

export default FailedGame;
