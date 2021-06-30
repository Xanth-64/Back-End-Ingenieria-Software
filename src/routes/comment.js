const express = require("express");
const router = express.Router();

const defaultCrudCallbacks = require("../Controllers/commentController");
import { getcomentario_Producto } from "../Controllers/commentController";

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

router.get("/id_producto/:id_pro", getcomentario_Producto);

module.exports = router;
