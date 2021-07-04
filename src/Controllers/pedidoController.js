const sequelize = require("../Sequelize/modelingIndex");
const { Sequelize, Op, QueryTypes } = require("sequelize");
import { defaultCrudCallbacks } from "./crud";

export const productosPedido = async (req,res) => {
  try{
    const doc1 = await sequelize.models.pedido.findAll({
      where  : {
        id_pedido = req.params.id
      },
      include : {
        model : sequelize.models.producto,
        required: true,

      }
    })
    return res.status(200).json({message : 'Informacion Encontrada Exitosamente', data : doc1 })
  }catch(err){
    console.log(err)
    return res.status(400).end();
  }
}

export const productosDriver = async (req, res) => {
  try {
    const doc1 = await sequelize.models.driver.findAll({
      where: { id_transportista: req.params.id },
      include: {
        model: sequelize.models.pedido,
        required: true,
        include: {
          model: sequelize.models.producto,
          required: true,
        },
      },
    });
    return res
      .status(200)
      .json({ message: "Informacion Recuperada con Exito", data: doc1 });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

export const productosEmprendimiento = async (req, res) => {
  try {
    const doc1 = await sequelize.models.emprendimiento.findAll({
      where: { id_negocio: req.params.id },
      include: {
        model: sequelize.models.producto,
        required: true,
        include: {
          model: sequelize.models.pedido,
          required: true,
        },
      },
    });
    return res
      .status(200)
      .json({ message: "Informacion Recuperada con Exito", data: doc1 });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

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

// Este query verifica que dia de la semana se compra mas
// Agrupa las fechas y sca la cantidad total que se genero por ese dio y la cantidad que hubo
export async function pedido_dia_promedio(req, res) {
  try {
    const pedido = await sequelize.models.pedido.findAll(req.body);

    if (pedido) {
      const pedido_dia = await sequelize.query(
        `SELECT COUNT(id_pedido) as Cantidad ,CAST(fecha AS DATE) as fecha, ROUND( CAST(sum(monto_total) AS NUMERIC), 3)  as total from pedido
group by CAST(fecha AS DATE)`
      );

      if (pedido_dia) {
        return res.json({
          message: `Pedidos por dia con su promedio de venta`,
          data: pedido_dia[0],
        });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "ERROR", data: {} });
  }
}
