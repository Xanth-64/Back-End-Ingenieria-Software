const express = require("express");
const router = express.Router();
import {pedido_dia_promedio} from "../Controllers/pedidoController";
const defaultCrudCallbacks = require("../Controllers/pedidoController");

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
router.get("/pedido_dia", pedido_dia_promedio);
module.exports = router;
