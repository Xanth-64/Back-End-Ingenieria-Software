const express = require("express");
const router = express.Router();
//importamos las funciones del archivo correspondiente, cada ruta tendra el suyo
// import {
//   postUsuario,
//   getUsuario,
//   putUsuario,
// } from "../Controllers/userControllers";

const defaultCrudCallbacks = require("../Controllers/userControllers");

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

module.exports = router;
