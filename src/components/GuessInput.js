import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import './GuessInput.css';

function GuessInput({ onGuessSubmit }) {
  const [guess, setGuess] = useState("");
  const labelText = "Enter your guess:";

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && guess.trim()) {
      onGuessSubmit(guess.trim());
      setGuess("");
    }
  };

  const handleChange = (event) => {
    setGuess(event.target.value);
  };

  return (
    <div className="Guess-input">
      <div>
        {labelText}
      </div>
      <TextField 
        value={guess}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Type a word and press Enter"
      />
    </div>
  );
}

export default GuessInput;

