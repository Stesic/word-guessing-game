import "./StartNewGame.style.css";

type Props = {
  handleClick: () => void;
};

function StartNewGame({ handleClick }: Props) {
  return (
    <div className="animated-text" onClick={handleClick}>
      StartNewGame
    </div>
  );
}

export default StartNewGame;
