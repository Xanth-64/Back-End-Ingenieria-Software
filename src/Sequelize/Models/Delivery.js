/*Representación en la BD de una Empresa de Transportistas
  - id_empresa(PK): INTEGER => ID de la empresa
  - nombre: STRING => nombre de la empresa
  - direccion: STRING => direccion de la empresa
*/
import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const empresa_transportistas = sequelize.define(
    "empresa_transportistas",
    {
      id_empresa: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return empresa_transportistas;
};
