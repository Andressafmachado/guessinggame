import React, { useEffect, useState } from "react";
const randomNumber = Math.round(Math.random() * 10);
const maxAttempts = 3;

export default function HomePage() {
  const [itemInput, setItemInput] = useState("");
  const [counter, setCounter] = useState(maxAttempts);
  const [list, setList] = useState([]);
  const userGuess = parseInt(itemInput);
  const [alert, setAlert] = useState(false);

  //refresh the page delete the DB, set inicial state
  const newcounter = counter;
  const deleteData = newcounter == 3 && list.length > 0 ? deleteDB() : null;

  //warning
  const warning = () => {
    if (0 > userGuess || userGuess > 10) {
      return <p>please choose a number between 0 and 10</p>;
    }
  };

  const winner = parseInt(itemInput) === randomNumber;

  //play again
  const playAgain = () => {
    setCounter(maxAttempts);
  };

  //fetch all attempts
  function getList() {
    return fetch("http://localhost:4000").then((data) => data.json());
  }

  //function to add new attempt to the DB
  function setItem(item) {
    return fetch("http://localhost:4000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userGuess: item }),
    }).then((data) => data.json(item));
  }

  //clean database for next game
  function deleteDB() {
    return fetch("http://localhost:4000", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    }).then((data) => data.json());
  }

  useEffect(() => {
    let mounted = true;
    if (list.length && !alert) {
      return;
    }
    getList().then((items) => {
      if (mounted) {
        setList(items);
      }
    });
    return () => (mounted = false);
  }, [alert, list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setItem(itemInput).then(() => {
      setAlert(true);
      setCounter(counter - 1);
    });
  };

  //remove alert
  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  }, [alert]);

  //set counter to 0 if there is a winner
  useEffect(() => {
    if (winner) {
      setTimeout(() => {
        setCounter(0);
      }, 2000);
    }
  }, [alert]);

  const game = () => {
    if (counter > 0) {
      return (
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              onChange={(event) => setItemInput(event.target.value)}
              value={itemInput}
            />
          </label>
          <button type="submit">check</button>
        </form>
      );
    } else if (counter <= 0 && !winner) {
      return (
        <div>
          <h2> sorry, you lost </h2>
        </div>
      );
    } else if (counter <= 0 && winner) {
      return (
        <div>
          <h2>{`you won, the number was ${randomNumber}`}</h2>
          <form onSubmit={deleteDB}>
            <button type="submit">play again</button>
          </form>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>Guessing game</h2>
      <p>Guess a number between 0 and 10.</p>
      <p>{`you have ${counter} attempts`}</p>
      {game()}
      {warning()}
      {winner
        ? alert && (
            <div>
              <h2> You won</h2>
            </div>
          )
        : alert && <h2> Wrong, try again</h2>}
      <p>your last attempts: </p>
      {!list || list < 1 ? (
        <p>your attempts will be here</p>
      ) : (
        list.map((item, index) => {
          return <p key={index}>{item.userGuess}</p>;
        })
      )}
    </div>
  );
}
