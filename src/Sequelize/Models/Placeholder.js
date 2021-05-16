//TODO Hacer otro modelos aqui
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const randomBoy = sequelize.define(
    "somethingRandom",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { freezeTableName: true }
  );

  return randomBoy;
};