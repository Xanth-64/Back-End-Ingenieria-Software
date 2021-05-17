//TODO Hacer el resto del modelo del Usuario

//Representacion en la BD de un Usuario
import { DataTypes } from "sequelize";

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
