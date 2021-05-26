const express = require("express");
const router = express.Router();

import {
  postDriver,
  getDriver,
  putDriver,
} from "../Controllers/driverController";
//RUTAS POST, GET, PUT.
router.post("/", postDriver);
router.get("/:id_transportista", getDriver);
router.put("/:id_transportista", putDriver);
module.exports = router;
