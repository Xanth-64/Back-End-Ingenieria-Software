import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const suscripcion = sequelize.define(
    "suscripcion",
    {
      id_suscripcion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return suscripcion;
};
