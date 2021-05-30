import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const promocion = sequelize.define(
    "promocion",
    {
      id_descuento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return promocion;
};
