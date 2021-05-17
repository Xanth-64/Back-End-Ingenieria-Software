/*Representación en la BD de un Catalogo/Categoria
- id_categoria(PK): INTEGER => ID de la categoria
- nombre(AK): STRING => Nombre de la Categoria
*/
import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const catalog = sequelize.define(
    "catalogo",
    {
      id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { freezeTableName: true }
  );

  return catalog;
};
