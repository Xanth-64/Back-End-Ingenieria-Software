const sequelize = require("../Sequelize/modelingIndex");

import { defaultCrudCallbacks } from "./crud";

export const linkProducts = async (req, res) => {
  try {
    const doc1 = await sequelize.models.pedido.findByPk(req.params.id);
    if (doc1) {
      req.body.productIdArr.forEach(async (elem) => {
        const prod = await sequelize.models.producto.findByPk(elem);
        await doc1.addProducto(prod);
      });
      return res
        .status(200)
        .json({ message: "Productos enlazados exitosamente", data: [] });
    }
    return res.status(400).json({
      message: "Request fallido, No existe El Pedido solicitado",
      data: [],
    });
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
};
//Exportacion de los Cruds Basicos para el Modelo de Pedidos. (Ahora el modelo tiene los Cruds basicos automaticamente.)
export default defaultCrudCallbacks(sequelize.models.pedido);
