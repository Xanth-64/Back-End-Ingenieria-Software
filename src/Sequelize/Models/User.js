/*Representación en la BD de un Usuario
  - id_usuario(PK): INTEGER => ID del usuario
  - tipo: ENUM => tipo de usuario (Administrador, Cliente, Emprendedor, Transportista)
  - password: STRING => Contraseña del usuario
  - nombre: STRING => nombre del usuario
  - apellido: STRING => apellido del usuario
  - email(AK): STRING => Correo del usuario
  - telefono(AK): STRING => Teléfono del usuario
  - picture: STRING => URL de la imagen de perfil
*/
import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

async function generateHash(password) {
  return await bcrypt.hash(password, 10);
}

module.exports = (sequelize) => {
  const usuario = sequelize.define(
    "usuario",
    {
      id_usuario: {
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
      password: {
        type: DataTypes.STRING,
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
      imagen_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user) {
            user.password = await generateHash(user.password);
          }
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            user.password = await generateHash(user.password);
          }
        },
      },
      instanceMethods: {
        validateHash: async (password) => {
          return await bcrypt.compare(password, this.password);
        },
      },
    }
  );

  return usuario;
};
