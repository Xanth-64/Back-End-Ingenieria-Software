const express = require("express");
const router = express.Router();

const defaultCrudCallbacks = require("../Controllers/driverController");

//RUTA POST
router.post("/one", defaultCrudCallbacks.default.createOne);
//RUTA GET
router.get("/one/:id", defaultCrudCallbacks.default.getOne);
router.get("/all", defaultCrudCallbacks.default.getMany);
//RUTA PUT
router.put("/one/:id", defaultCrudCallbacks.default.updateOne);
//RUTA DELETE
router.delete("/one/:id", defaultCrudCallbacks.default.deleteOne);

module.exports = router;

// import {
//   postDriver,
//   getDriver,
//   putDriver,
// } from "../Controllers/driverController";
// //RUTAS POST, GET, PUT.
// router.post("/", postDriver);
// router.get("/:id_transportista", getDriver);
// router.put("/:id_transportista", putDriver);
// module.exports = router;
