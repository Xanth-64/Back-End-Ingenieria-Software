import { Sequelize } from "sequelize";

//Instancia del objeto Sequelize Inicial que permite la conexion a la BD
const sequelize = new Sequelize(process.env.DB);

//Importacion de Modelos de la carpeta Models
const user = require("./Models/User")(sequelize);
const business = require("./Models/Business")(sequelize);
const driver = require("./Models/Driver")(sequelize);
const vehicle = require("./Models/Vehicle")(sequelize);
const delivery = require("./Models/Delivery")(sequelize);
const product = require("./Models/Product")(sequelize);
const subcat = require("./Models/SubCategory")(sequelize);
const catalog = require("./Models/Catalog")(sequelize);
const discount = require("./Models/Discount")(sequelize);

//Importacion del archivo de Generacion de Relaciones de la Carpeta Models
const relation = require("./Models/Relationships")(sequelize);

//Exportacion del objeto Sequelize
module.exports = sequelize;
