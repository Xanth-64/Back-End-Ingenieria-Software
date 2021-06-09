const sequelize = require("../Sequelize/modelingIndex");

import { defaultCrudCallbacks } from "./crud";

//Función que retorna las subcategorías que pertenezcan a una categoría en específico.
export const getSubcategoriesFromCategory = async (req, res) => {
  try {
    const category = await sequelize.models.categoria.findByPk(req.params.id);
    if (category) {
      const subCats = await category.getSubcategoria();
      return res
        .status(200)
        .json({
          message: "Subcategorias Encontradas",
          data: subCats,
        })
        .end();
    }
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

//Funcion que dada el id de una categoria le crea la subcategoria indicada.
export const createSubCategoriaFromCategory = async (req, res) => {
  try {
    const category = await sequelize.models.categoria.findByPk(req.params.id);
    if (category) {
      const subCat = await sequelize.models.subcategoria.create(req.body);
      await category.addSubcategoria(subCat);
      if (subCat) {
        return res
          .status(200)
          .json({
            message: "Subcategoria Creada",
            data: [subCat],
          })
          .end();
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

//Exportacion de los Cruds Basicos para el Modelo de Subcategoria. (Ahora el modelo tiene los Cruds basicos automaticamente.)
export default defaultCrudCallbacks(sequelize.models.subcategoria);
