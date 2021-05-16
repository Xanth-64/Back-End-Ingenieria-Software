import { Sequelize } from "sequelize";
const sequelize = new Sequelize(
  "postgres://ttftwapi:xF_4hvkF37hHqA8XNtPeX5TkCy9SGbec@hansken.db.elephantsql.com:5432/ttftwapi"
);

const user = require("./Models/User")(sequelize);

module.exports = sequelize;
