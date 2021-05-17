//Representacion en la BD de un Producto
import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const discount = sequelize.define(
    "descuento",
    {
      id_descuento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      porcentaje: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
          min: 0,
          max: 100,
        },
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

  return discount;
};
