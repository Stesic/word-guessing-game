import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { dictionaryData } from "../data/dictionaryData";

import FailedGame from "../components/FailedGame/FailedGame";
import CompletedGame from "../components/CompletedGame/CompletedGame";
import Games from "./components/Games/Games";
import Field from "./components/Field/Field";

const maxAttempts = 50;

const initialAttemptState = [0];

const getGussingWord = () => {
  const randomIndex = Math.floor(Math.random() * dictionaryData?.length);
  return dictionaryData
    .filter((word) => word.length === 6)
    [randomIndex]?.toLowerCase();
};

function NewApp() {
  const wordToGuess = useMemo(() => {
    return getGussingWord();
  }, []);

  const [guessingWord, setGuessingWord] = useState(wordToGuess);

  // console.log(guessingWord);

  const [attempts, setAttempts] = useState(initialAttemptState);

  const [isCompleted, setIsCompleted] = useState(false);

  const appendAttempt = useCallback(() => {
    setAttempts((prev) => {
      return [...prev, prev.length + 1];
    });
  }, []);

  const handleCompletedGame = useCallback(() => {
    setIsCompleted(true);
  }, []);

  const handleStartNewGame = useCallback(() => {
    const newWordToGuess = getGussingWord();

    setAttempts(initialAttemptState);
    setIsCompleted(false);
    setGuessingWord(newWordToGuess);
  }, []);

  useEffect(() => {
    window.onkeydown = function (e) {
      if (e.key.toLowerCase() === "tab") {
        return false;
      }
    };
  }, []);

  if (!guessingWord) {
    return null;
  }

  if (attempts.length - 1 === maxAttempts) {
    return <FailedGame handleStartNewGame={handleStartNewGame} />;
  }

  if (isCompleted) {
    return <CompletedGame handleStartNewGame={handleStartNewGame} />;
  }

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        {guessingWord.split("").map((word: string, index: number) => (
          <Field value={word} key={index} />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {attempts.map((data, index) => (
          <Games
            key={index + " " + guessingWord}
            guessingWord={guessingWord}
            appendAttempt={appendAttempt}
            handleCompletedGame={handleCompletedGame}
            showSubmit={index === attempts.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

export default NewApp;
