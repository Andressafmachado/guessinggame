import React, { useState } from "react";
const randomNumber = Math.round(Math.random() * 10);
const maxAttempts = 3;

export default function HomePage() {
  const [number, setNumber] = useState("");
  const [counter, setCounter] = useState(maxAttempts);
  const userGuess = parseInt(number);

  //warning
  const warning = () => {
    if (0 > userGuess || userGuess > 10) {
      return <p>please choose a number between 0 and 10</p>;
    }
  };

  //play again
  const playAgain = () => {
    setCounter(maxAttempts);
  };

  //messages
  const success = <p>{`you won, the number was ${randomNumber}`}</p>;
  const lose = <p>sorry, you lost</p>;

  const guessing = () => {
    if (userGuess === randomNumber) return success;
    if (counter == 0) return lose;
  };

  const results = guessing(number);

  return (
    <div>
      <h2>Guessing game</h2>
      <p>Guess a number between 0 and 10.</p>
      <p>{`you have ${counter} attempts`}</p>
      <input
        // min="1"
        // max="10"
        value={number}
        type="number"
        onChange={(e) => setNumber(e.target.value)}
      />
      {counter == 0 || results == success ? (
        <button onClick={playAgain}>play again?</button>
      ) : (
        <button
          type="submit"
          onClick={guessing}
          onClick={() => setCounter(counter - 1)}
        >
          check
        </button>
      )}

      <br />
      {warning()}
      {results}
    </div>
  );
}
