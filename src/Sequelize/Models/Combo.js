import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const combo = sequelize.define(
    "combo",
    {
      id_combo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return combo;
};
