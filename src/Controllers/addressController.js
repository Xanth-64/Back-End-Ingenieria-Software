const sequelize = require("../Sequelize/modelingIndex");

import { defaultCrudCallbacks } from "./crud";

//Exportacion de los Cruds Basicos para el Modelo de Direccion. (Ahora el modelo tiene los Cruds basicos automaticamente.)
export default defaultCrudCallbacks(sequelize.models.direccion);
