/*Representación en la BD de un Producto
  - id_producto(PK): INTEGER => ID del producto
  - nombre: STRING => nombre del Producto
  - descripcion: STRING => descripcion del Producto 
  - peso: ENUM => Peso del Producto (Ligero, Mediano, Pesado o Muy Pesado)
  - precio: DOUBLE => Precio del producto
  - fotos: STRING[] => Array de Fotos del Producto
  - condiciones: STRING => Posibles Condiciones especiales del producto (Fragile, Refrigerado y/o Liquido)
*/
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
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      fotos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      condiciones: {
        type: DataTypes.ARRAY(
          DataTypes.ENUM("Fragile", "Refrigerado", "Líquido")
        ),
      },
    },
    { freezeTableName: true }
  );

  return product;
};
