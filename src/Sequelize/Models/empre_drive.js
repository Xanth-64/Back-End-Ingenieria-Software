import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const empre_drive = sequelize.define(
    "empre_drive",
    {
      id_empre: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      nombre:{
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcion : {
        type: DataTypes.TEXT
      }
      ,
      verificado:{
        type: DataTypes.BOOLEAN
      }
    },
    { freezeTableName: true }
  );

  return empre_drive;
};