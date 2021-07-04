const express = require("express");
const router = express.Router();
import { pedido_dia_promedio } from "../Controllers/pedidoController";
const defaultCrudCallbacks = require("../Controllers/pedidoController");
import {
  linkProducts,
  productosDriver,
  productosEmprendimiento,
  productosPedido,
} from "../Controllers/pedidoController";
//RUTA POST
router.post("/one", defaultCrudCallbacks.default.createOne);
//RUTA GET
router.get("/one/:id", defaultCrudCallbacks.default.getOne);
router.post("/some", defaultCrudCallbacks.default.getSome);
router.get("/all", defaultCrudCallbacks.default.getMany);
//RUTA PUT
router.put("/one/:id", defaultCrudCallbacks.default.updateOne);
router.put("/some", defaultCrudCallbacks.default.updateSome);
//RUTA DELETE
router.delete("/one/:id", defaultCrudCallbacks.default.deleteOne);
router.get("/pedido_dia", pedido_dia_promedio);

//Enlazar productos y pedido

router.post("/linkProds/:id", linkProducts);
router.get("/productos/driver/:id", productosDriver);
router.get("/productos/empre/:id", productosEmprendimiento);
router.get("/productos/pedido/:id", productosPedido);
module.exports = router;
