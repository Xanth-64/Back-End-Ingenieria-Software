const express = require("express");
const router = express.Router();

const defaultCrudCallbacks = require("../Controllers/productController");
import { getProducto_categoria } from "../Controllers/productController";
//RUTA POST
router.post("/one", defaultCrudCallbacks.default.createOne);
//RUTA GET
router.get("/one/:id", defaultCrudCallbacks.default.getOne);
router.get("/some", defaultCrudCallbacks.default.getSome);
router.get("/all", defaultCrudCallbacks.default.getMany);
//RUTA PUT
router.put("/one/:id", defaultCrudCallbacks.default.updateOne);
router.put("/some", defaultCrudCallbacks.default.updateSome);
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
