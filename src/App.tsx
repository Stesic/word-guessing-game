import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";

import Games from "./components/Games/Games";
import Field from "./components/Field/Field";
import { dictionaryData } from "./data/dictionaryData";
import FailedGame from "./components/FailedGame/FailedGame";
import CompletedGame from "./components/CompletedGame/CompletedGame";

const maxAttempts = 5;

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

  console.log(guessingWord, "guessing word");

  return (
    <div className="container">
      {attempts.map((_, index) => (
        <Games
          key={index + " " + guessingWord}
          guessingWord={guessingWord}
          appendAttempt={appendAttempt}
          handleCompletedGame={handleCompletedGame}
          showActionButtons={index === attempts.length - 1}
        />
      ))}
    </div>
  );
}

export default NewApp;
