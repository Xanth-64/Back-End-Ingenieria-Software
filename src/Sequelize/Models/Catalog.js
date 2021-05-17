//Representacion en la BD de un Catalogo
import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const catalog = sequelize.define(
    "catalogo",
    {
      id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return catalog;
};
