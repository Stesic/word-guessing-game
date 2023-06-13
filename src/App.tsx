import { useCallback, useEffect, useState } from "react";
import "./App.css";

import Game from "./components/Game/Game";
import FailedGame from "./components/FailedGame/FailedGame";
import CompletedGame from "./components/CompletedGame/CompletedGame";
import { dictionaryData } from "./data/dictionaryData";

const maxAttempts = 7;

const initialAttemptState = [0];

const getGussingWord = () => {
  const filterDictionary = dictionaryData.filter((word) => word?.length === 6);
  const randomIndex = Math.floor(Math.random() * filterDictionary?.length);
  return filterDictionary[randomIndex]?.toLowerCase();
};

function App() {
  const [guessingWord, setGuessingWord] = useState("");

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
    const wordToGuess = getGussingWord();
    setGuessingWord(wordToGuess);
  }, []);

  if (!guessingWord) {
    return <></>;
  }

  if (attempts.length - 1 === maxAttempts) {
    return (
      <FailedGame handleStartNewGame={handleStartNewGame} word={guessingWord} />
    );
  }

  if (isCompleted) {
    return <CompletedGame handleStartNewGame={handleStartNewGame} />;
  }

  console.log("WORD TO GUESS IS ", `"${guessingWord}"`);

  return (
    <div className="container">
      {attempts.map((_, index) => (
        <Game
          key={index + " " + guessingWord}
          guessingWord={guessingWord}
          appendAttempt={appendAttempt}
          handleCompletedGame={handleCompletedGame}
          showActionButtons={index === attempts.length - 1}
          handleStartNewGame={handleStartNewGame}
        />
      ))}
    </div>
  );
}

export default App;
