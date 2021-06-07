const sequelize = require("../Sequelize/modelingIndex");

import { defaultCrudCallbacks } from "./crud";

export default defaultCrudCallbacks(sequelize.models.pedido);
