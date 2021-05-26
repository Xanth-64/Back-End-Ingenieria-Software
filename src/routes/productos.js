const express = require("express");
const router = express.Router();

import {
  postProducto,
  getProducto,
  putProducto,
} from "../Controllers/productController";
//RUTAS POST, GET, PUT.
router.post("/", postProducto);
router.get("/:id_producto", getProducto);
router.put("/:id_producto", putProducto);
module.exports = router;
