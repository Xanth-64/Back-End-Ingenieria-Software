import { crearSuscripcion } from "../Controllers/suscripcionController";

const express = require("express");
const router = express.Router();

const defaultCrudCallbacks = require("../Controllers/suscripcionController");

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

//Crear suscripcion para un Emprendedor
router.post("/createSuscripcion/:id", crearSuscripcion);
module.exports = router;
