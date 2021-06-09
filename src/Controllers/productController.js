const sequelize = require("../Sequelize/modelingIndex");
const { Sequelize, Op, QueryTypes } = require("sequelize");
import { defaultCrudCallbacks } from "./crud";

//Exportacion de los Cruds Basicos para el Modelo de Producto. (Ahora el modelo tiene los Cruds basicos automaticamente.)
export default defaultCrudCallbacks(sequelize.models.producto);

// ---- QUERY - trae los productos en base a la categoria
export async function getProducto_categoria(req, res) {
  const { nombre } = req.params;

  try {
    const producto = await sequelize.query(
      'SELECT id_producto, producto.nombre as producto ,descripcion,"producto"."isVisible", peso, fotos, precio, condiciones, categoria.nombre as "categoria" FROM categoria INNER JOIN subcategoria ON categoria.id_categoria="subcategoria"."categoriumIdCategoria"INNER JOIN producto ON subcategoria.id_subcat= "producto"."subcategoriumIdSubcat"WHERE categoria.nombre= (:comida)',

      {
        type: QueryTypes.SELECT,
        replacements: { comida: nombre },
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
      .json({ message: "No se encontro la informacion", data: [{}] });
  }
}
//-------------------------------------------------------------

//PARA SABER MAS REVISAR userControllers.js  donde esta documentado

// export async function postProducto(req, res) {
//   console.log(req.body);
//   const { nombre, descripcion, peso, precio, fotos, condiciones } = req.body;

//* Cruds Basicos realizados anteriormente. Reemplazados por los Cruds Genericos pero aun conservan Valor referencial.
//! No Eliminar.
// export async function postProducto(req, res) {
//   console.log(req.body);
//   const { nombre, descripcion, peso, precio, fotos, condiciones } = req.body;

//   try {
//     let new_product = await sequelize.models.producto.create({
//       nombre,
//       descripcion,
//       peso,
//       precio,
//       fotos,
//       condiciones,
//     });
//     if (new_product) {
//       return res.json({
//         message: "Product created",
//         dato: new_product,
//       });
//     }
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ message: "Todo mal", data: {} });
//   }
// }
// export async function getProducto(req, res) {
//   const { id_producto } = req.params;

//   const producto = await sequelize.models.producto.findOne({
//     where: {
//       id_producto,
//     },
//   });
//   res.json({ data: producto });
// }

// export async function putProducto(req, res) {
//   const { id_producto } = req.params;
//   const { nombre, descripcion, peso, precio, fotos, condiciones } = req.body;
//   const datos = await sequelize.models.producto.findAll({
//     attributes: [
//       "id_producto",
//       "nombre",
//       "descripcion",
//       "peso",
//       "precio",
//       "fotos",
//       "condiciones",
//     ],
//     where: {
//       id_producto,
//     },
//   });

//   if (datos.length > 0) {
//     datos.forEach(async (dato) => {
//       await dato.update({
//         nombre,
//         descripcion,
//         peso,
//         precio,
//         fotos,
//         condiciones,
//       });
//     });
//   }

//   return res.json({
//     message: "Actaulizado",
//     data: datos,
//   });
// }
// export async function getProducto(req, res) {
//   const { id_producto } = req.params;
