import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const comentario = sequelize.define(
    "comentario",
    {
      id_comentario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      comentario: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    { freezeTableName: true }
  );

  return comentario;
};
