import { useCallback, useEffect, useState } from "react";
import { countCharacters, getIndexesOfChar } from "../../../helpers/fn";
import { EGameStatus } from "../../../types";

import "./Games.style.css";
import Field from "../Field/Field";
import SubmitButton from "../SubmitButton/SubmitButton";

type Props = {
  guessingWord: string;
  appendAttempt?: any;
  handleCompletedGame?: any;
  showSubmit?: boolean;
  handleStartNewGame?: any;
};

const defaultInputValues = {
  status: EGameStatus.Ongoing,
  fields: {
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  },
};
function Games({
  guessingWord,
  appendAttempt,
  handleCompletedGame,
  showSubmit,
  handleStartNewGame,
}: Props) {
  const countedChars = countCharacters(guessingWord);

  const [keysPressed, setKeysPressed] = useState(["", "", "", "", "", ""]);
  const [gameStatus, setGameStatus] = useState(EGameStatus.Ongoing);
  const [styleResults, setStyleResults] = useState<string[]>([]);

  const [numberOfCharacters, setNumberOfCharacters] = useState({});

  const allValuesEntered =
    keysPressed.findIndex((element) => element === "") === -1;

  const handleSubmit = (event: any) => {
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
  }, [guessingWord]);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
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
  }, [guessingWord, keysPressed]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div className="inputs-container">
        {keysPressed.map((keyObj: string, index: number) => {
          return (
            <Field
              nameOfClass={styleResults ? styleResults[index] : ""}
              key={index}
              gameStatus={gameStatus}
              value={keyObj}
              correctValue={false}
              misplacedValue={false}
            ></Field>
          );
        })}
      </div>
      {showSubmit && (
        <>
          <SubmitButton
            disabled={!allValuesEntered}
            handleClick={handleSubmit}
          />
          <div onClick={handleStartNewGame}>reset</div>
        </>
      )}
    </div>
  );
}

export default Games;
