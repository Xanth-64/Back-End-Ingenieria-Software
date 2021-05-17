//Representacion en la BD de un Producto
import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const product = sequelize.define(
    "producto",
    {
      id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      peso: {
        type: DataTypes.ENUM("Ligero", "Mediano", "Pesado", "Muy Pesado"),
        allowNull: false,
      },
      precio: {
        type: DataTypes.REAL.UNSIGNED((decimals = 2)),
        allowNull: false,
      },
      fotos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      condiciones: {
        type: DataTypes.ARRAY(DataTypes.ENUM("Fragile", "Refrigerado", "Líquido"))
      }
    },
    { freezeTableName: true }
  );

  return product;
};
