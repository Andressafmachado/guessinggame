import gameover from "../images/gameover.png";
import "./HomePage.css";
import React, { useEffect, useState } from "react";
const randomNumber = Math.round(Math.random() * 10);
const maxAttempts = 3;

export default function HomePage() {
  const [input, setInput] = useState("");
  const userGuess = parseInt(input);
  const [counter, setCounter] = useState(maxAttempts);
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState(false);
  console.log(randomNumber);

  //refresh the page delete the DB, set inicial state
  const deleteData = counter === 3 && list.length > 0 ? deleteDB() : null;

  //warning
  const warning = () => {
    if (0 > userGuess || userGuess > 10) {
      return (
        <p id="warning">
          {" "}
          <strong>please, choose a number between 0 and 10</strong>
        </p>
      );
    }
  };

  //there is a winner?
  const winner = parseInt(input) === randomNumber;

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
        "Access-Control-Allow-Headers": "*",
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
        "Access-Control-Allow-Headers": "*",
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
    setItem(input).then(() => {
      setAlert(true);
      setCounter(counter - 1);
    });
  };

  //remove alert
  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 1000);
    }
  }, [alert]);

  //set counter to 0 if there is a winner
  useEffect(() => {
    if (winner) {
      setCounter(0);
    }
  }, [winner]);

  //game logic
  const game = () => {
    if (counter > 0) {
      return (
        <form onSubmit={handleSubmit}>
          <p id="message">{`you still have ${counter} attempts`}</p>
          <label>
            <input
              id="input"
              type="text"
              onChange={(event) => setInput(event.target.value)}
              value={input}
            />
          </label>
          <button id="button" type="submit">
            check
          </button>
        </form>
      );
    } else if (counter <= 0 && !winner) {
      return (
        <div>
          <img src={gameover} alt="gameOver" width="40%" />
          {/* <h2> sorry, you lost </h2> */}
          <form onSubmit={deleteDB}>
            <button id="button" type="submit">
              play again
            </button>
          </form>
        </div>
      );
    } else if (counter <= 0 && winner) {
      return (
        <div>
          <h2 id="won">{`you won, the number was ${randomNumber}`}</h2>
          <form onSubmit={deleteDB}>
            <button id="button" type="submit">
              play again
            </button>
          </form>
        </div>
      );
    }
  };

  return (
    <div className="HomePage">
      <h1 className="title">Guessing Game</h1>
      <div className="game">
        <p>Guess a number between 0 and 10.</p>

        {game()}
        {warning()}
        {!winner ? alert && <h3 id="wrongmessage"> Wrong!</h3> : null}
        <p>your last attempts: </p>
        {!list || list < 1 ? (
          <p id="message"> attempts will be here</p>
        ) : (
          list.map((item, index) => {
            return <h5 key={index}>{item.userGuess}</h5>;
          })
        )}
      </div>
    </div>
  );
}
