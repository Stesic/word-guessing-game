import { useCallback, useState } from "react";
import "./App.css";

import Games from "./components/Games/Games";
import { dictionaryData } from "./data/dictionaryData";
import FailedGame from "./components/FailedGame/FailedGame";
import CompletedGame from "./components/CompletedGame/CompletedGame";

const maxAttempts = 5;

const initialAttemptState = [0];

const getGussingWord = () => {
  const filterDictionary = dictionaryData.filter((word) => word.length === 6);
  const randomIndex = Math.floor(Math.random() * filterDictionary?.length);
  return filterDictionary[randomIndex]?.toLowerCase();
};

function App() {
  const wordToGuess = getGussingWord();

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

  if (!guessingWord) {
    return <p>Loading</p>;
  }

  if (attempts.length - 1 === maxAttempts) {
    return <FailedGame handleStartNewGame={handleStartNewGame} />;
  }

  if (isCompleted) {
    return <CompletedGame handleStartNewGame={handleStartNewGame} />;
  }

  console.log(wordToGuess, "WORD TO GUESS");

  return (
    <div className="container">
      {attempts.map((_, index) => (
        <Games
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
