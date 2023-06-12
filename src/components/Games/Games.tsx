import { useEffect, useState } from "react";

import "./Games.style.css";
import Field from "../Field/Field";
import SubmitButton from "../SubmitButton/SubmitButton";
import {
  countCharacters,
  getIndexesOfChar,
  validateLetter,
} from "../../helpers/fn";
import { EGameStatus } from "../../types";
import ReloadButton from "../ReloadButton/ReloadButton";

type Props = {
  guessingWord: string;
  appendAttempt: () => void;
  handleCompletedGame: () => void;
  showActionButtons: boolean;
  handleStartNewGame: () => void;
};

function Games({
  guessingWord,
  appendAttempt,
  handleCompletedGame,
  showActionButtons,
  handleStartNewGame,
}: Props) {
  const countedChars = countCharacters(guessingWord);

  const [keysPressed, setKeysPressed] = useState(["", "", "", "", "", ""]);
  const [gameStatus, setGameStatus] = useState(EGameStatus.Ongoing);
  const [styleResults, setStyleResults] = useState<string[]>([]);

  const [numberOfCharacters, setNumberOfCharacters] = useState({});

  const allValuesEntered =
    keysPressed.findIndex((element) => element === "") === -1;

  const handleSubmit = () => {
    const currentWord = keysPressed.join("").toLowerCase();
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
    setNumberOfCharacters(countedChars);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guessingWord]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const keyPressed = event.key;
      const isValid = validateLetter(keyPressed);
      if (!isValid) return;
      setKeysPressed((prev) => {
        const emptyValue = prev.findIndex((element) => element === "");

        if (emptyValue === -1) return prev;

        const updatedData = [...prev];
        updatedData[emptyValue] = event.key;
        return updatedData;
      });
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    let emptyIndex = keysPressed.findIndex((element) => element === "");
    let keyPressed = keysPressed[emptyIndex - 1];

    if (!keysPressed[0] || styleResults.length === 6) return;
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

        setStyleResults((prev) => {
          const newResults = prev;
          allPrevSelectedKeys.forEach((key) => {
            newResults[key] = "error";
          });
          return [...newResults, "correct"];
        });
      } else {
        setStyleResults((prev) => {
          return [...prev, "correct"];
        });
      }
    } else if (
      numberOfCharacters[keyPressed as keyof typeof numberOfCharacters] > 0
    ) {
      setStyleResults((prev) => {
        return [...prev, "misplaced"];
      });
    } else {
      setStyleResults((prev) => {
        return [...prev, "error"];
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guessingWord, keysPressed]);

  return (
    <div className="games-container">
      <div className="games-fields-wrap">
        {keysPressed.map((keyObj: string, index: number) => {
          return (
            <Field
              nameOfClass={styleResults ? styleResults[index] : ""}
              key={index}
              gameStatus={gameStatus}
              value={keyObj}
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

export default Games;
