/*Representación en la BD de una Subcategoria
  - id_subcat(PK): INTEGER => ID de la subcategoria
  - nombre: STRING => nombre de la subcategoria
*/

import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const subcat = sequelize.define(
    "subcategoria",
    {
      id_subcat: {
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

  return subcat;
};
