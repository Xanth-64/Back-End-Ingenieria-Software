const express = require("express");
const router = express.Router();

const defaultCrudCallbacks = require("../Controllers/driverController");
import {
  getUsuario_Driver,
  getDriver_Condicion,
  createFromUserAndEmpre,
  getDriversFromEmpre,
  getAvailableDrivers,
} from "../Controllers/driverController";

//RUTA POST
router.post("/one", defaultCrudCallbacks.default.createOne);
router.post("/one/byUserAndEmpre", createFromUserAndEmpre);
//RUTA GET
router.get("/one/:id", defaultCrudCallbacks.default.getOne);
router.post("/some", defaultCrudCallbacks.default.getSome);
router.get("/some/byEmpreDrive/:id", getDriversFromEmpre);
router.get("/all", defaultCrudCallbacks.default.getMany);
//RUTA PUT
router.put("/one/:id", defaultCrudCallbacks.default.updateOne);
router.put("/some", defaultCrudCallbacks.default.updateSome);
//RUTA DELETE
router.delete("/one/:id", defaultCrudCallbacks.default.deleteOne);

router.get("/driver_usuario/:id", getUsuario_Driver);
router.get("/driver_condicion/:condi", getDriver_Condicion);
router.get("/all/withAddress", getAvailableDrivers);
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
