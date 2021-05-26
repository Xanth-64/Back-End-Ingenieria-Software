const express = require("express");
const router = express.Router();

import {
  postEmpren,
  getEmpren,
  putEmpren,
} from "../Controllers/EmprenController";
//RUTAS POST, GET, PUT.
router.post("/", postEmpren);
router.get("/:id_negocio", getEmpren);
router.put("/:id_negocio", putEmpren);
module.exports = router;
