import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const cuenta_paypal = sequelize.define(
    "cuenta_paypal",
    {
      id_paypal: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      correo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return cuenta_paypal;
};
