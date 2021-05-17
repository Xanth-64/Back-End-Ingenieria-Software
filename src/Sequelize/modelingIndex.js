import { Sequelize } from "sequelize";

//Instancia del objeto Sequelize Inicial que permite la conexion a la BD
const sequelize = new Sequelize(process.env.DB);

//Importacion de Modelos de la carpeta Models
const user = require("./Models/User")(sequelize);
const product = require("./Models/Product")(sequelize);
const subcat = require("./Models/SubCategory")(sequelize);
const catalog = require("./Models/Catalog")(sequelize);
const discount = require("./Models/Discount")(sequelize);

//Importacion del archivo de Generacion de Relaciones de la Carpeta Models
const relation = require("./Models/Relationships");

//Exportacion del objeto Sequelize
module.exports = sequelize;
