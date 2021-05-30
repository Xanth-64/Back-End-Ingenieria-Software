import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const puntaje_emprende = sequelize.define(
    "puntaje_emprende",
    {
      id_puntaje_emprende: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      puntaje: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 5,
        },
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    { freezeTableName: true }
  );

  return puntaje_emprende;
};
