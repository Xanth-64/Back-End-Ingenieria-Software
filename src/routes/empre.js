const express = require("express");
const router = express.Router();

const defaultCrudCallbacks = require("../Controllers/EmprenController");

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

// import {
//   postEmpren,
//   getEmpren,
//   putEmpren,
// } from "../Controllers/EmprenController";
// //RUTAS POST, GET, PUT.
// router.post("/", postEmpren);
// router.get("/:id_negocio", getEmpren);
// router.put("/:id_negocio", putEmpren);
// module.exports = router;
