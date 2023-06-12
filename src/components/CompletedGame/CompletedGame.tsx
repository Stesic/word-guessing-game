import React from "react";
import StartNewGame from "../StartNewGame/StartNewGame";
import Confetti from "../Confetti/Confetti";

type Props = {
  handleStartNewGame: any;
};

function CompletedGame({ handleStartNewGame }: Props) {
  return (
    <div className="container">
      <div
        style={{
          width: "400px",
          height: "200px",
          position: "relative",
          marginLeft: "300px",
        }}
      >
        <Confetti />
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <StartNewGame handleClick={handleStartNewGame} />
      </div>
    </div>
  );
}

export default CompletedGame;
