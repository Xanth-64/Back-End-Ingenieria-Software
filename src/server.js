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
  // Esto autentica la conexion antes de inicializar la App
  sequelize
    .authenticate()
    .then(async (msg) => {
      console.log("Autenticacion Exitosa con la DB");
      //sequelize.sync Conecta los modelos de la ORM con la BD
      //Opciones: {alter: <Boolean> #Hace que modifique las tablas para que se adapte a los modelos}
      //Opciones: {force: <Boolean> #Hace que Dropee las tablas cada vez que crea una coneccion}
      //! NO UTILIZAR FORCE EN PRODUCCION BAJO NINGUN CONCEPTO
      await sequelize.sync({ alter: true });
    })
    .catch((err) => {
      console.error(`Error al Conectar con la BD: ${err}`);
    });

  app.listen(4000, () => {
    console.log(`Aplicacion escuchando en el puerto ${4000}`);
  });
};
