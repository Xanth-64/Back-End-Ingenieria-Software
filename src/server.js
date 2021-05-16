import express from "express";
import { json, urlencoded } from "body-parser";
import sequelize from "./Sequelize/modelingIndex";

//Configuracion Base de Express.

const app = express();

//Middleware para el buen funcionamiento de la REST API.

//Parseo a JSON de los Bodys.
app.use(json());

//Requerimiento de que los parametros de las peticiones esten en la URL de las mismas.
app.use(urlencoded({ extended: true }));

export const start = async () => {
  sequelize
    .authenticate()
    .then(async (msg) => {
      console.log("Autenticacion Exitosa con la DB");
      await sequelize.sync({ alter: true });
    })
    .catch((err) => {
      console.error(`Error al Conectar con la BD: ${err}`);
    });

  app.listen(4000, () => {
    console.log(`Aplicacion escuchando en el puerto ${4000}`);
  });
};
