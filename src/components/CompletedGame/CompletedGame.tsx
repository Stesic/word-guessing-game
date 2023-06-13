import StartNewGame from "../StartNewGame/StartNewGame";
import Confetti from "../Confetti/Confetti";

import "./CompletedGame.style.css";

type Props = {
  handleStartNewGame: () => void;
};

function CompletedGame({ handleStartNewGame }: Props) {
  return (
    <div className="container">
      <div className="confetti-wrap">
        <Confetti />
      </div>
      <div className="new-game-wrap">
        <StartNewGame handleClick={handleStartNewGame} />
      </div>
    </div>
  );
}

export default CompletedGame;
