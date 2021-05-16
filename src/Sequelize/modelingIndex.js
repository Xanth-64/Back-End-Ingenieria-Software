import { Sequelize } from "sequelize";

//Instancia del objeto Sequelize Inicial que permite la conexion a la BD
const sequelize = new Sequelize(
  "postgres://ttftwapi:xF_4hvkF37hHqA8XNtPeX5TkCy9SGbec@hansken.db.elephantsql.com:5432/ttftwapi"
);

//Importacion de Modelos de la carpeta Models
const user = require("./Models/User")(sequelize);

//Exportacion del objeto Sequelize
module.exports = sequelize;
