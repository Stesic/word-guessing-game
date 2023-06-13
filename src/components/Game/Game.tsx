import { useEffect, useState } from "react";

import "./Game.style.css";
import Field from "../Field/Field";
import SubmitButton from "../SubmitButton/SubmitButton";
import { countCharacters, getIndexesOfChar } from "../../helpers/fn";
import { ECharStatus, EGameStatus } from "../../types";
import ReloadButton from "../ReloadButton/ReloadButton";
import useHandleKyePressEvent from "./useHandleKyePressEvent";

type Props = {
  guessingWord: string;
  appendAttempt: () => void;
  handleCompletedGame: () => void;
  showActionButtons: boolean;
  handleStartNewGame: () => void;
};

function Game({
  guessingWord,
  appendAttempt,
  handleCompletedGame,
  showActionButtons,
  handleStartNewGame,
}: Props) {
  const [keysPressed, setKeysPressed] = useState(["", "", "", "", "", ""]);

  useHandleKyePressEvent({
    setKeysPressed,
  });

  const [gameStatus, setGameStatus] = useState(EGameStatus.Ongoing);
  const [charsStatusses, setCharsStatusses] = useState<ECharStatus[]>([]);

  const [numberOfCharacters, setNumberOfCharacters] = useState({});

  const allValuesEntered =
    keysPressed.findIndex((element) => element === "") === -1;

  const handleSubmit = () => {
    const currentWord = keysPressed.join("");
    const isCorrect = currentWord === guessingWord;
    if (isCorrect) {
      handleCompletedGame();
      return;
    }

    setGameStatus(EGameStatus.Submited);
    appendAttempt();
    setGameStatus(EGameStatus.Submited);
  };

  useEffect(() => {
    const countedChars = countCharacters(guessingWord);
    setNumberOfCharacters(countedChars);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guessingWord]);

  useEffect(() => {
    let emptyIndex = keysPressed.findIndex((element) => element === "");
    let keyPressed = keysPressed[emptyIndex - 1];

    const firstKeyPressed = keysPressed[0];
    const allCharsSatussesSet = charsStatusses.length === 6;

    if (!firstKeyPressed || allCharsSatussesSet) return;
    if (emptyIndex < 0) {
      // handle last typed char
      emptyIndex = keysPressed.length;
      keyPressed = keysPressed[keysPressed.length - 1];
    }

    setNumberOfCharacters((prev) => {
      return {
        ...prev,
        [keyPressed]: prev[keyPressed as keyof typeof prev] - 1,
      };
    });

    if (keyPressed === guessingWord[emptyIndex - 1]) {
      if (
        numberOfCharacters[keyPressed as keyof typeof numberOfCharacters] <= 0
      ) {
        const allPrevSelectedKeys = getIndexesOfChar(
          keysPressed.join(""),
          keyPressed
        );
        allPrevSelectedKeys.pop(); //remove index of correct one (last one)

        setCharsStatusses((prev) => {
          const newResults = prev;
          allPrevSelectedKeys.forEach((key) => {
            newResults[key] = ECharStatus.Error;
          });
          return [...newResults, ECharStatus.Correct];
        });
      } else {
        setCharsStatusses((prev) => {
          return [...prev, ECharStatus.Correct];
        });
      }
    } else if (
      numberOfCharacters[keyPressed as keyof typeof numberOfCharacters] > 0
    ) {
      setCharsStatusses((prev) => {
        return [...prev, ECharStatus.Mislplaced];
      });
    } else {
      setCharsStatusses((prev) => {
        return [...prev, ECharStatus.Error];
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guessingWord, keysPressed]);

  return (
    <div className="games-container">
      <div className="games-fields-wrap">
        {keysPressed.map((value: string, index: number) => {
          return (
            <Field
              nameOfClass={charsStatusses ? charsStatusses[index] : null}
              key={index}
              gameStatus={gameStatus}
              value={value}
            ></Field>
          );
        })}
      </div>
      {showActionButtons && (
        <div className="buttons-container">
          <SubmitButton
            disabled={!allValuesEntered}
            handleClick={handleSubmit}
          />
          <ReloadButton handleClick={handleStartNewGame} />
        </div>
      )}
    </div>
  );
}

export default Game;
