/*Representación en la BD de un Vehículo
  - id_vehiculo(PK): INTEGER => ID del vehículo
  - placa(AK): STRING => Placa del Vehiculo
  - capacidad: ENUM => capacidad máxima del vehículo
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
      capacidad: {
        type: DataTypes.ENUM("Ligero", "Mediano", "Pesado", "Muy Pesado"),
        allowNull: false,
      },
      condiciones: {
        type: DataTypes.ARRAY(
          DataTypes.ENUM("Fragile", "Refrigerado", "Líquido")
        ),
      },
      placa: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
