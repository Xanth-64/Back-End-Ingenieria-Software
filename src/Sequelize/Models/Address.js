import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const address = sequelize.define(
    "direccion",
    {
      id_direccion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      latitud: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      longitud: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return address;
};
