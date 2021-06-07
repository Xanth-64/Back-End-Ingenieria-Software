import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const pedido = sequelize.define(
    "pedido",
    {
      id_pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      monto_tienda: {
        type: DataTypes.REAL,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      monto_driver: {
        type: DataTypes.REAL,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      monto_total: {
        type: DataTypes.REAL,
        allowNull: false,
        validate: {
          min: 0,
        },
      },

      estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "EN CAMINO",
      },
    },
    { freezeTableName: true }
  );

  return pedido;
};
