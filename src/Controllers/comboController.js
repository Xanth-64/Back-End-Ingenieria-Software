const sequelize = require("../Sequelize/modelingIndex");
const { Sequelize, Op, QueryTypes } = require("sequelize");

//Obtener todos los productos de un combo
export async function getProductosByCombo(req, res) {
  const { id_combo } = req.params;

  try {
    const productos = await sequelize.query(
      `SELECT producto.* FROM combo
      INNER JOIN combo_producto ON "combo_producto"."comboIdCombo" = combo.id_combo
      INNER JOIN producto ON producto.id_producto = "combo_producto"."productoIdProducto"
      WHERE combo.combo_id = (:id);`,

      {
        type: QueryTypes.SELECT,
        replacements: { id: id_combo },
      }
    );

    if (productos) {
      return res.json({
        message: "Productos encontrados",
        data: productos,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "ERROR", data: {} });
  }
}

import { defaultCrudCallbacks } from "./crud";

//Exportacion de los Cruds Basicos para el Modelo de Combo. (Ahora el modelo tiene los Cruds basicos automaticamente.)
export default defaultCrudCallbacks(sequelize.models.combo);
