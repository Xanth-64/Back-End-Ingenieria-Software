const express = require("express");
const router = express.Router();
//importamos las funciones del archivo correspondiente, cada ruta tendra el suyo
// import {
//   postUsuario,
//   getUsuario,
//   putUsuario,
// } from "../Controllers/userControllers";
import { postUsuario } from "../Controllers/userControllers";

const defaultCrudCallbacks = require("../Controllers/userControllers");

//RUTA POST
router.post("/one", defaultCrudCallbacks.default.createOne);
//RUTA GET
router.get("/one/:id", defaultCrudCallbacks.default.getOne);
router.post("/some", defaultCrudCallbacks.default.getSome);
router.get("/all", defaultCrudCallbacks.default.getMany);
router.get("/direccion/:id", defaultCrudCallbacks.getUsuarioDireccion);
router.get("/pedidos/:id", defaultCrudCallbacks.getUsuarioPedidos);
//RUTA PUT
router.put("/one/:id", defaultCrudCallbacks.default.updateOne);
router.put("/some", defaultCrudCallbacks.default.updateSome);
//RUTA DELETE
router.delete("/one/:id", defaultCrudCallbacks.default.deleteOne);

router.post("/enviar", postUsuario);

module.exports = router;
