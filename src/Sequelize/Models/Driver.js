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
  const transportista = sequelize.define(
    "transportista",
    {
      id_transportista: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      cuota: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      valoracion: {
        type: DataTypes.REAL,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return transportista;
};
