const sequelize = require("../Sequelize/modelingIndex");

import { defaultCrudCallbacks } from "./crud";

//Exportacion de los Cruds Basicos para el Modelo de Comentario. (Ahora el modelo tiene los Cruds basicos automaticamente.)
export default defaultCrudCallbacks(sequelize.models.comentario);
const { Sequelize, Op, QueryTypes } = require("sequelize");
export async function getcomentario_Producto(req, res) {
  const { id_pro } = req.params;

  try {
    const producto = await sequelize.query(
      `select comentario.*from comentario inner join pedido ON "comentario"."pedidoIdPedido"=pedido.id_pedido
       inner join producto_pedidos ON "producto_pedidos"."pedidoIdPedido"=pedido.id_pedido 
       inner join producto ON "producto_pedidos"."productoIdProducto"=producto.id_producto 
       where producto.id_producto=(:id_pro)`,

      {
        type: QueryTypes.SELECT,
        replacements: { id_pro:  id_pro},
      }
    );
    if (producto) {
      return res.json({
        message: "Product extraido",
        dato: producto,
      });
    }
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ message: "No se encontro ningun comentario  del producto", data: [{}] });
  }
}