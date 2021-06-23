const sequelize = require("../Sequelize/modelingIndex");
const { Sequelize, Op, QueryTypes } = require("sequelize");
import { defaultCrudCallbacks } from "./crud";

//Exportacion de los Cruds Basicos para el Modelo de Producto. (Ahora el modelo tiene los Cruds basicos automaticamente.)
export default defaultCrudCallbacks(sequelize.models.producto);

// ---- QUERY - Trae TODOS los productos de TODAS las Categorias

export const getAllProductosAndCategorias = async (req, res) => {
  try {
    const doc = await sequelize.models.categoria.findAll({
      include: {
        model: sequelize.models.subcategoria,
        required: true,
        include: {
          model: sequelize.models.producto,
          right: true,
          where: {
            isVisible: true,
          },
        },
      },
    });

    if (doc) {
      return res.status(200).json({
        message: "Data encontrada Exitosamente",
        data: doc,
      });
    }
    return res.status(400).json({
      message: "No se pudo encontrar la Data",
      data: [],
    });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

// ---- QUERY - Enlaza un producto a una Subcategoría

export const linkProductAndSubcat = async (req, res) => {
  try {
    const doc1 = await sequelize.models.producto.findByPk(req.body.productId);
    const doc2 = await sequelize.models.subcategoria.findByPk(
      req.body.subcatId
    );
    console.log(doc1);
    console.log(doc2);
    if (doc1 && doc2) {
      await doc1.setSubcategorium(doc2);
      return res.status(200).json({
        message: "Union Creada Exitosamente",
        data: [doc1, doc2],
      });
    }
    return res
      .status(400)
      .json({ message: "Error Buscando las entidades a Asociar", data: [] });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

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

//Creación asociada de un producto nuevo a una categoría ya existente
export async function createProductoIntoCombo(req, res) {
  const id_combo = req.params.id;

  try {
    const producto = await sequelize.models.producto.create(req.body);

    if (producto) {
      const combo_producto = await sequelize.query(
        `INSERT INTO combo_producto
        VALUES (?, ?, ?, ?);`,

        {
          type: QueryTypes.INSERT,
          replacements: [Date.now(), Date.now(), producto.id_producto, id_combo],
        }
      );

      if (combo_producto) {
        return res.json({
          message: `Nuevo producto añadido a la categoría (${id_combo})`,
          data: producto,
        });
      }
    }
  } catch(e) {
    console.log(e);
    res.status(500).json({ message: "ERROR", data: {} });
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
