const express = require("express");
const router = express.Router();
import {
  createSubCategoriaFromCategory,
  getSubcategoriesFromCategory,
} from "../Controllers/subCategoryController";
const defaultCrudCallbacks = require("../Controllers/subCategoryController");

//RUTA POST
router.post("/one", defaultCrudCallbacks.default.createOne);
router.post("/one/byCategory/:id", createSubCategoriaFromCategory);
//RUTA GET
router.get("/one/:id", defaultCrudCallbacks.default.getOne);
router.get("/some", defaultCrudCallbacks.default.getSome);
router.get("/all/byCategory/:id", getSubcategoriesFromCategory);
router.get("/all", defaultCrudCallbacks.default.getMany);
//RUTA PUT
router.put("/one/:id", defaultCrudCallbacks.default.updateOne);
router.put("/some", defaultCrudCallbacks.default.updateSome);
//RUTA DELETE
router.delete("/one/:id", defaultCrudCallbacks.default.deleteOne);

module.exports = router;
