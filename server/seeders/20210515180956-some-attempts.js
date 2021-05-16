"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "attempts",
      [
        {
          user: "Andressa",
          attempt: 1,
          randomNumber: 1,
          userGuess: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user: "renan",
          attempt: 1,
          randomNumber: 1,
          userGuess: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("attempts", null, {});
  },
};
