const sequelize = require("../Sequelize/modelingIndex");
const { Sequelize, Op, QueryTypes } = require("sequelize");
import { defaultCrudCallbacks } from "./crud";

//Exportacion de los Cruds Basicos para el Modelo de Pedidos. (Ahora el modelo tiene los Cruds basicos automaticamente.)
export default defaultCrudCallbacks(sequelize.models.pedido);

// Este query verifica que dia de la semana se compra mas
// Agrupa las fechas y sca la cantidad total que se genero por ese dio y la cantidad que hubo
export async function pedido_dia_promedio(req, res) {
  

  try {
    const pedido = await sequelize.models.pedido.findAll(req.body);

    if (pedido) {
      const pedido_dia = await sequelize.query(
        `SELECT COUNT(id_pedido) as Cantidad ,CAST(fecha AS DATE) as fecha, ROUND( CAST(sum(monto_total) AS NUMERIC), 3)  as total from pedido
group by CAST(fecha AS DATE)`,

       
      );

      if (pedido_dia) {
        return res.json({
          message: `Pedidos por dia con su promedio de venta`,
          data: pedido_dia[0],
        });
      }
    }
  } catch(e) {
    console.log(e);
    res.status(500).json({ message: "ERROR", data: {} });
  }
}