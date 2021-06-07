import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const cuenta_crypto = sequelize.define(
    "cuenta_crypto",
    {
      id_crypto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      moneda: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      red: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return cuenta_crypto;
};
