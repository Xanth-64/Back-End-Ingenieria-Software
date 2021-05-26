const express = require("express");
const router = express.Router();
//importamos las funciones del archivo correspondiente, cada ruta tendra el suyo
import {
  postUsuario,
  getUsuario,
  putUsuario,
} from "../Controllers/userControllers";

//RUTA POST
router.post("/", postUsuario);
//RUTA GET
router.get("/:id_usuario", getUsuario);
//RUTA POST
router.put("/:id_usuario", putUsuario);
module.exports = router;
