"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "attempts",
      [
        {
          userGuess: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
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
