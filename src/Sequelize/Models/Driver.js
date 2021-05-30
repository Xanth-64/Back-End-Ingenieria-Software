/*Representación en la BD de un Transportista
  - id_transportista(PK): INTEGER => ID del transportista
  - cuota: REAL => pago esperado por los servicios prestados
  - valoracion: REAL => valoración recibida por los clientes
  Atributos que pudieran no ser necesarios:
  - FALTA IMAGEN DE LA LICENCIA
  - FALTA IMAGEN DEL CERTIFICADO DE SALUD
*/
import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const driver = sequelize.define(
    "driver",
    {
      id_transportista: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      tarifa: {
        type: DataTypes.REAL,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      licencia_picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      certi_salud: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { freezeTableName: true }
  );

  return driver;
};
