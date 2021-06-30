const express = require("express");
const router = express.Router();

const defaultCrudCallbacks = require("../Controllers/productController");
import {
  getProducto_categoria,
  getAllProductosAndCategorias,
  linkProductAndSubcat,
} from "../Controllers/productController";
//RUTA POST
router.post("/one", defaultCrudCallbacks.default.createOne);
router.post("/combo/:id", defaultCrudCallbacks.createProductoIntoCombo);
//RUTA GET
router.get("/one/:id", defaultCrudCallbacks.default.getOne);
router.post("/some", defaultCrudCallbacks.default.getSome);
router.get("/all", defaultCrudCallbacks.default.getMany);
router.get("/all/withCategories", getAllProductosAndCategorias);
//RUTA PUT
router.put("/one/:id", defaultCrudCallbacks.default.updateOne);
router.put("/some", defaultCrudCallbacks.default.updateSome);
router.put("/link/subCat", linkProductAndSubcat);
//RUTA DELETE
router.delete("/one/:id", defaultCrudCallbacks.default.deleteOne);
//RUTA PARA TRAER LOS PRODUCTOS EN BASE A UNA CATEGORIA
router.get("/:nombre", getProducto_categoria);
module.exports = router;

// import {
//   postProducto,
//   getProducto,
//   putProducto,
// } from "../Controllers/productController";
// //RUTAS POST, GET, PUT.
// router.post("/", postProducto);
// router.get("/:id_producto", getProducto);
// router.put("/:id_producto", putProducto);
// module.exports = router;
