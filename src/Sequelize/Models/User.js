//TODO Hacer el resto del modelo del Usuario
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const usuario = sequelize.define(
    "usuario",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { freezeTableName: true }
  );

  return usuario;
};
