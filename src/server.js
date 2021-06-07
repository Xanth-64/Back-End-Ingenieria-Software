import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import morgan from "morgan";
import sequelize from "./Sequelize/modelingIndex";
//Configuracion Base de Express.

const app = express();

//Middleware para el buen funcionamiento de la REST API.

//Parseo a JSON de los Bodys.
app.use(json());

//Permisión del Cross Referencing
app.use(cors());

//Requerimiento de que los parametros de las peticiones esten en la URL de las mismas.
app.use(urlencoded({ extended: true }));

//Morgan hace logs mas bonitos de lo que sucede con los Endpoints
app.use(morgan("dev"));

// Ruta a usar de usuarios. Para usar la ruta se debe escribir exactamente
//en INSOMNIA o POSTMAN 'http://localhost:4000/api/usuarios'
//dependiendo de cual metodo se vaya a usar (get,put o post ) se debe era anexar
//lo que el archivo en rutas de cada modelo indica.
//--Debe ir siempre requiere("El nombre del archivo que se creo en la carpeta Router")
app.use("/api/address", require("./routes/address"));
app.use("/api/bankAccount", require("./routes/bankAccount"));
app.use("/api/catalog", require("./routes/catalog"));
app.use("/api/combo", require("./routes/combo"));
app.use("/api/comment", require("./routes/comment"));
app.use("/api/cryptoAccount", require("./routes/cryptoAccount"));
app.use("/api/discount", require("./routes/discount"));
app.use("/api/drivers", require("./routes/drivers"));
app.use("/api/empre_drive", require("./routes/empre_drive"));
app.use("/api/empre", require("./routes/empre"));
app.use("/api/paypalAccount", require("./routes/paypalAccount"));
app.use("/api/pointsBusiness", require("./routes/pointsBusiness"));
app.use("/api/pointsDriver", require("./routes/pointsDriver"));
app.use("/api/productos", require("./routes/productos"));
app.use("/api/promotion", require("./routes/promotion"));
app.use("/api/subCategory", require("./routes/subCategory"));
app.use("/api/suscription", require("./routes/suscription"));
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/vehicle", require("./routes/vehicle"));

//Rutas de Autenticación
app.use("/api/auth", require("./routes/auth"));

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
  
      await sequelize.sync({ force: false });
    })
    .catch((err) => {
      console.error(`Error al Conectar con la BD: ${err}`);
    });
  app.listen(process.env.PORT, () => {
    console.log(`Aplicacion escuchando en el puerto ${process.env.PORT}`);
  });
};
