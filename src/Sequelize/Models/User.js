/*Representación en la BD de un Usuario
  - usuario_id(PK): INTEGER => ID del usuario
  - tipo: ENUM => tipo de usuario (administrador: 0, cliente: 1, emprendedor: 2, transportista: 3)
  - nombre: STRING => nombre del usuario
  - apellido: STRING => apellido del usuario
  - email(AK): STRING => Correo del usuario
  - telefono(AK): STRING => Teléfono del usuario
  - password: STRING => Contraseña del usuario
  - imagen_url: STRING => URL de la imagen de perfil
  - direccion: STRING => Dirección del domicilio del usuario
*/

//Representacion en la BD de un Usuario
import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  const usuario = sequelize.define(
    "usuario",
    {
      usuario_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      tipo: {
        type: DataTypes.ENUM(
          "Administrador",
          "Cliente",
          "Emprendedor",
          "Transportista"
        ),
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagen_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return usuario;
};
