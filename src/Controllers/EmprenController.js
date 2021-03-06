const sequelize = require("../Sequelize/modelingIndex");
const { Sequelize, Op, QueryTypes } = require("sequelize");

import { defaultCrudCallbacks } from "./crud";

//Exportacion de los Cruds Basicos para el Modelo de Emprendedor. (Ahora el modelo tiene los Cruds basicos automaticamente.)
export default defaultCrudCallbacks(sequelize.models.emprendimiento);

// ---- QUERY - ontienes los emprendimientos si estan verificados o no
export const createEmpreFromUser = async (req, res) => {
  try {
    const user = await sequelize.models.usuario.findByPk(req.params.id);
    const newEmprendimiento = await user.createEmprendimiento(req.body);
    if (newEmprendimiento) {
      return res.status(200).json({
        message: "Emprendimiento Creado y Asociado Exitosamente",
        data: [newEmprendimiento],
      });
    }
    return res.status(400).json({
      message: "No se pudo Asociar y Crear el Emprendimiento",
      data: [],
    });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

export async function getEmpren_veri(req, res) {
  const { verificado } = req.params;

  try {
    const empre_veri = await sequelize.query(
      "SELECT * FROM emprendimiento WHERE verificado=(:veri)",

      {
        type: QueryTypes.SELECT,
        replacements: { veri: Boolean(verificado) },
      }
    );
    if (empre_veri) {
      return res.json({
        message: "Product extraido",
        dato: empre_veri,
      });
    }
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ message: "No se encontro la informacion", data: [{}] });
  }
}

export async function getEmpre_usuario(req, res) {
  const { id } = req.params;

  try {
    const empre_usuario = await sequelize.query(
      `select usuario.* from emprendimiento
      inner join usuario on "emprendimiento"."usuarioIdUsuario"=usuario.id_usuario
      where emprendimiento.id_negocio= (:usuario)`,

      {
        type: QueryTypes.SELECT,
        replacements: { usuario: id },
      }
    );
    if (empre_usuario) {
      return res.json({
        message: "Usuario extraido",
        data: empre_usuario,
      });
    }
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ message: "No se encontro la informacion", data: [{}] });
  }
}

//Obtener productos de un emprendimiento
export async function getProductosByEmprendimiento(req, res) {
  const id_empre = req.params.id;

  try {
    const productos = await sequelize.query(
      `SELECT producto.* FROM emprendimiento
      INNER JOIN producto ON "producto"."emprendimientoIdNegocio" = emprendimiento.id_negocio
      WHERE emprendimiento.id_negocio = (:id);`,

      {
        type: QueryTypes.SELECT,
        replacements: { id: id_empre },
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

//Obtener la valoraci??n de un emprendimiento
export async function getValoracion(req, res) {
  const empre_id = req.params.id;

  try {
    const puntaje = await sequelize.query(
      `SELECT AVG(puntaje_emprende.puntaje) FROM emprendimiento
      INNER JOIN producto ON "producto"."emprendimientoIdNegocio" = emprendimiento.id_negocio
      INNER JOIN producto_pedido ON "producto_pedido"."productoIdProducto" = producto.id_producto
      INNER JOIN pedido ON pedido.id_pedido = "producto_pedido"."pedidoIdPedido"
      INNER JOIN puntaje_emprende ON "puntaje_emprende"."pedidoIdPedido" = pedido.id_pedido
      WHERE emprendimiento.id_negocio = (:id);`,

      {
        type: QueryTypes.SELECT,
        replacements: { id: empre_id },
      }
    );

    if (puntaje) {
      return res.json({
        message: "Valoraci??n determinada",
        data: puntaje,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "ERROR", data: {} });
  }
}
//PARA SABER MAS REVISAR userControllers.js  donde esta documentado

//* Cruds Basicos realizados anteriormente para el modelo de Emprendedor. Reemplazados por Genericos pero igualmente de Valor.
//!NO ELIMINAR
// export async function postEmpren(req, res) {
//   console.log(req.body);
//   const {
//     nombre,
//     descripcion,
//     valoracion,
//     esta_suscrito,
//     transporte_hab,
//     direccion,
//     usuarioIdUsuario,
//   } = req.body;

//   try {
//     let new_empren = await sequelize.models.negocio.create({
//       nombre,
//       descripcion,
//       valoracion,
//       esta_suscrito,
//       transporte_hab,
//       direccion,
//       usuarioIdUsuario,
//     });
//     if (new_empren) {
//       return res.json({
//         message: "Entrepreneurship created",
//         dato: new_empren,
//       });
//     }
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ message: "Todo mal", data: {} });
//   }
// }
// export async function getEmpren(req, res) {
//   const { id_negocio } = req.params;

//   const empren = await sequelize.models.negocio.findOne({
//     where: {
//       id_negocio,
//     },
//   });
//   res.json({ data: empren });
// }

// export async function putEmpren(req, res) {
//   const { id_negocio } = req.params;
//   const {
//     nombre,
//     descripcion,
//     valoracion,
//     esta_suscrito,
//     transporte_hab,
//     direccion,
//     usuarioIdUsuario,
//   } = req.body;
//   const datos = await sequelize.models.negocio.findAll({
//     attributes: [
//       "id_negocio",
//       "nombre",
//       "descripcion",
//       "valoracion",
//       "esta_suscrito",
//       "transporte_hab",
//       "direccion",
//       "usuarioIdUsuario",
//     ],
//     where: {
//       id_negocio,
//     },
//   });

//   if (datos.length > 0) {
//     datos.forEach(async (dato) => {
//       await dato.update({
//         nombre,
//         descripcion,
//         valoracion,
//         esta_suscrito,
//         transporte_hab,
//         direccion,
//         usuarioIdUsuario,
//       });
//     });
//   }

//   return res.json({
//     message: "Actaulizado",
//     data: datos,
//   });
// }
