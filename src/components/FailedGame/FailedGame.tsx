import StartNewGame from "../StartNewGame/StartNewGame";

import "./FailedGame.style.css";

type Props = {
  handleStartNewGame: () => void;
  word: string;
};

function FailedGame({ handleStartNewGame, word }: Props) {
  return (
    <div className="container">
      <img
        width={250}
        height={250}
        src="/images/betterLuck.svg"
        alt="better-luck"
      />
      <div className="failed-word">
        <b>
          Your word was:{" "}
          <i>
            <q>{word.toUpperCase()}</q>
          </i>
        </b>
      </div>
      <StartNewGame handleClick={handleStartNewGame} />
    </div>
  );
}

export default FailedGame;
