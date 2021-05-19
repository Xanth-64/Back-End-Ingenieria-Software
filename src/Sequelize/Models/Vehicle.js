/*Representación en la BD de un Vehículo
  - id_vehiculo(PK): INTEGER => ID del vehículo
  - tipo: ENUM => tipo del vehículo
  - capacidad: ENUM => capacidad máxima del vehículo
  - matricula: STRING => matrícula del vehículo
  - modelo: STRING => modelo del vehículo
  - marca: STRING => marca del vehículo
*/
import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const vehiculo = sequelize.define(
    "vehiculo",
    {
      id_vehiculo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      tipo: {
        type: DataTypes.ENUM("Camioneta", "Moto"),
        allowNull: false,
      },
      capacidad: {
        type: DataTypes.ENUM("Ligero", "Mediano", "Pesado", "Muy Pesado"),
        allowNull: false,
      },
      matricula: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      modelo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      marca: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return vehiculo;
};
