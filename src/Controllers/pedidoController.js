const sequelize = require("../Sequelize/modelingIndex");
const { Sequelize, Op, QueryTypes } = require("sequelize");
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

// MONTO TOTAL SEMANAL
export async function total_monto_semana(req, res) {
  

  try {
    const pedido = await sequelize.models.pedido.findAll(req.body);

    if (pedido) {
      const pedido_semana = await sequelize.query(
        `select sum(monto_tienda)from pedido 
            where "createdAt" BETWEEN (select now() - interval '7days') AND (select now()) `,

       
      );

      if (pedido_semana) {
        return res.json({
          message: `El monto total de la semana es`,
          data: pedido_semana[0],
        });
      }
    }
  } catch(e) {
    console.log(e);
    res.status(500).json({ message: "ERROR", data: {} });
  }
}

// MONTO TOTAL MENSUAL
export async function total_monto_mensual(req, res) {
  

  try {
    const pedido = await sequelize.models.pedido.findAll(req.body);

    if (pedido) {
      const pedido_mensual = await sequelize.query(
        `select sum(monto_tienda)from pedido 
              where "createdAt" BETWEEN (select now() - interval '1month') AND (select now()) `,

       
      );

      if (pedido_mensual) {
        return res.json({
          message: `El monto total de la semana es`,
          data: pedido_mensual[0],
        });
      }
    }
  } catch(e) {
    console.log(e);
    res.status(500).json({ message: "ERROR", data: {} });
  }
}

// monto total anual
export async function total_monto_anual(req, res) {
  

  try {
    const pedido = await sequelize.models.pedido.findAll(req.body);

    if (pedido) {
      const pedido_anual = await sequelize.query(
        `select sum(monto_tienda)from pedido 
              where "createdAt" BETWEEN (select now() - interval '1year') AND (select now()) `,

       
      );

      if (pedido_anual) {
        return res.json({
          message: `El monto total de la semana es`,
          data: pedido_anual[0],
        });
      }
    }
  } catch(e) {
    console.log(e);
    res.status(500).json({ message: "ERROR", data: {} });
  }
}

// TRAE EL MONTO TOTAL AL ESPECEFICAR LA CANTIDAD DE MESES HACIA ATRAS
export async function total_mensual_especifico(req, res) {
  const meses= req.params.meses;
 
  try {
    const pedido = await sequelize.models.pedido.findAll(req.body);

    if (pedido) {
      const pedido_mensual = await sequelize.query(
        `select sum(monto_tienda)from pedido 
              where "createdAt" BETWEEN (select now() - interval ':mes month') AND (select now()) `,

       {
        type: QueryTypes.SELECT,
        replacements: { mes: parseInt(meses)},
      }
    
      );

      if (pedido_mensual) {
        return res.json({
          message: `El monto total de la semana es`,
          data: pedido_mensual [0],
        });
      }
    }
  } catch(e) {
    console.log(e);
    res.status(500).json({ message: "ERROR", data: {} });
  }
}

//topo 5 de los usuarios que han ralizado más compras a un negocio
export async function topocinto_usuarios_compranmas(req, res) {
  const id= req.params.id;
 
  try {
    const empren = await sequelize.models.pedido.findAll(req.body);

    if (empren) {
      const usuarios_empren = await sequelize.query(
        `select count( usuario.id_usuario ) as cantidad, usuario.* from pedido
                inner join  usuario ON "pedido"."usuarioIdUsuario"=usuario.id_usuario
                inner join producto_pedidos ON "producto_pedidos"."pedidoIdPedido"=pedido.id_pedido
                inner join producto ON producto.id_producto="producto_pedidos"."productoIdProducto"
                where "emprendimientoIdNegocio"=(:id_empren)
                group by( usuario.id_usuario )  order by cantidad desc limit 5 `,

       {
        type: QueryTypes.SELECT,
        replacements: { id_empren: id},
      }
    
      );

      if (usuarios_empren) {
        return res.json({
          message: `El monto total de la semana es`,
          data:  usuarios_empren ,
        });
      }
    }
  } catch(e) {
    console.log(e);
    res.status(500).json({ message: "ERROR", data: {} });
  }
}
