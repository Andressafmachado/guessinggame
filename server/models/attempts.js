"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class attempts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  attempts.init(
    {
      user: DataTypes.STRING,
      attempt: DataTypes.INTEGER,
      randomNumber: DataTypes.INTEGER,
      userGuess: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "attempts",
    }
  );
  return attempts;
};
