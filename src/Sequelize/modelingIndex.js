import { Sequelize } from "sequelize";

//Instancia del objeto Sequelize Inicial que permite la conexion a la BD
const sequelize = new Sequelize(process.env.DB);

//Importacion de Modelos de la carpeta Models
const address = require("./Models/Address")(sequelize);
const bank_account = require("./Models/BankAccount")(sequelize);
const business = require("./Models/Business")(sequelize);
const catalog = require("./Models/Catalog")(sequelize);
const combo = require("./Models/Combo")(sequelize);
const comment = require("./Models/Comment")(sequelize);
const crypto_account = require("./Models/CryptoAccount")(sequelize);
const discount = require("./Models/Discount")(sequelize);
const driver = require("./Models/Driver")(sequelize);
const empre_drive = require("./Models/empre_drive")(sequelize);
const order = require("./Models/Order")(sequelize);
const paypal_account = require("./Models/PaypalAccount")(sequelize);
const points_business = require("./Models/PointsBusiness")(sequelize);
const points_driver = require("./Models/PointsDriver")(sequelize);
const product = require("./Models/Product")(sequelize);
const promotion = require("./Models/Promotion")(sequelize);
const subcategory = require("./Models/SubCategory")(sequelize);
const suscription = require("./Models/Suscription")(sequelize);
const user = require("./Models/User")(sequelize);
const vehicle = require("./Models/Vehicle")(sequelize);
//Importacion del archivo de Generacion de Relaciones de la Carpeta Models
const relation = require("./Models/Relationships")(sequelize);

//Exportacion del objeto Sequelize
module.exports = sequelize;
