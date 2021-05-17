/*Representación en la BD de un Descuento
- id_descuento(PK): INTEGER => ID del descuento
- porcentaje: INTEGER => Porcentaje del descuento
- fecha_inicio: DATE => Fecha de Inicio del descuento
- fecha_final: DATE => Fecha de Culminacion del descuento
*/
import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const discount = sequelize.define(
    "descuento",
    {
      id_descuento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      porcentaje: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 100,
        },
      },
      fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return discount;
};
