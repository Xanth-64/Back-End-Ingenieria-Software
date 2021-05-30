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
  const emprendimiento = sequelize.define(
    "emprendimiento",
    {
      id_negocio: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name_empresa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verificado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      descripcion: {
        type: DataTypes.TEXT,
      },
    },
    { freezeTableName: true }
  );

  return emprendimiento;
};
