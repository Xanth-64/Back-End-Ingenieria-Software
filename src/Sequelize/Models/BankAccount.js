import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const cuenta_banca = sequelize.define(
    "cuenta_banca",
    {
      id_cuenta_banca: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      banco: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rif_ci: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      numero_de_cuenta: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { freezeTableName: true }
  );

  return cuenta_banca;
};
