const express = require("express");
const Attempts = require("./models").attempts;
const app = express();
const PORT = 4000;

//middleware
app.use(express.json());

//get all
app.get("/", async (req, res) => {
  const attempts = await Attempts.findAll();
  res.send(attempts);
});

//GET a game by id
app.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const game = await Attempts.findByPk(id);
    if (!game) {
      res.status(404).send("game not found");
    } else {
      res.send(game);
    }
  } catch (e) {
    next(e);
  }
});

//Create a new TodoList
app.post("/", async (req, res, next) => {
  const { name, userGuess } = req.body;
  try {
    const name = req.body.name;
    const userGuess = req.body.userGuess;
    if (!userGuess || userGuess === " ") {
      res.status(400).send("Must provide more info");
    } else {
      const attempts = await Attempts.create(req.body);
      res.json(attempts);
    }
  } catch (e) {
    next(e);
  }
});

//Update an user
//at terminal http PUT :4000/users/1 name="Andreia"
app.put("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const gameToUpdate = await Attempts.findByPk(id);
    if (!gameToUpdate) {
      res.status(404).send("Game not found");
    } else {
      const updatedGame = await gameToUpdate.update(req.body);
      res.json(updatedGame);
    }
  } catch (e) {
    next(e);
  }
});

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
