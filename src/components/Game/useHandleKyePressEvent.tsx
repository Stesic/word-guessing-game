import React, { useEffect } from "react";
import { validateLetter } from "../../helpers/fn";

type Props = {
  setKeysPressed: React.Dispatch<React.SetStateAction<string[]>>;
};

function useHandleKyePressEvent({ setKeysPressed }: Props) {
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
  }, [setKeysPressed]);
}

export default useHandleKyePressEvent;
