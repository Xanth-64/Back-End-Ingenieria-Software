const express = require("express");
const router = express.Router();

const defaultCrudCallbacks = require("../Controllers/EmprenController");
import {
  getEmpren_veri,
  getEmpre_usuario,
  createEmpreFromUser,
} from "../Controllers/EmprenController";
//RUTA POST
router.post("/one", defaultCrudCallbacks.default.createOne);

//Crear con todo y Asociacion al Usuario
router.post("/one/byUsuario/:id", createEmpreFromUser);
//RUTA GET
router.get("/one/:id", defaultCrudCallbacks.default.getOne);
router.get("/some", defaultCrudCallbacks.default.getSome);
router.get("/all", defaultCrudCallbacks.default.getMany);
router.get("/valoracion/:id", defaultCrudCallbacks.getValoracionEmpren);
router.get("/productos/:id", defaultCrudCallbacks.getProductosByEmprendimiento);
router.get("/productos/ventas/:id", defaultCrudCallbacks.productosMasVendidos);
//RUTA PUT
router.put("/one/:id", defaultCrudCallbacks.default.updateOne);
router.put("/some", defaultCrudCallbacks.default.updateSome);
//RUTA DELETE
router.delete("/one/:id", defaultCrudCallbacks.default.deleteOne);
//RUTA PARA LOS EMPRENDIMIENTOS VERIFICADOS O NO
router.get("/veri/:verificado", getEmpren_veri);
router.get("/empre_usuario/:id", getEmpre_usuario);
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
