/*Representación en la BD de un Negocio
  - id_negocio(PK): INTEGER => ID del negocio
  - nombre: STRING => nombre del negocio
  - descripcion: STRING => descripción del negocio
  - valoracion: STRING => valoración recibida por los clientes
  - esta_suscrito: BOOLEAN => el emprendedor está suscrito
  - transporte_hab: BOOLEAN => el emprendedor puede entregar las órdenes
  - direccion: STRING => dirección del negocio
*/
import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const negocio = sequelize.define(
    "negocio",
    {
      id_negocio: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      descripcion: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      valoracion: {
          type: DataTypes.REAL,
          allowNull: false,
      },
      esta_suscrito: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
      },
      transporte_hab: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return negocio;
};
