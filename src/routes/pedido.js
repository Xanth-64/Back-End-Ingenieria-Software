const express = require("express");
const router = express.Router();
import {
  pedido_dia_promedio,
  total_monto_semana,
  total_mensual_especifico,
  total_monto_mensual,
  total_monto_anual,
  topocinto_usuarios_compranmas,
} from "../Controllers/pedidoController";
const defaultCrudCallbacks = require("../Controllers/pedidoController");
import {
  linkProducts,
  productosDriver,
  productosEmprendimiento,
  productosPedido,
} from "../Controllers/pedidoController";
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
router.get("/pedido_dia", pedido_dia_promedio);

//Enlazar productos y pedido

router.post("/linkProds/:id", linkProducts);
router.get("/productos/driver/:id", productosDriver);
router.get("/productos/empre/:id", productosEmprendimiento);
router.get("/productos/pedido/:id", productosPedido);

// pedido del monto total de 1 semana
router.get("/semana", total_monto_semana);
// total de ganancias realizadas en 1 mes
router.get("/mensual", total_monto_mensual);

// total de ganancias realizadas en 1 año
router.get("/anual", total_monto_anual);

//total de las ganancias realizadas en una cantidad de meses especificada
router.get("/mes/:meses", total_mensual_especifico);
//topo 5 de los clientes que mas compran a un negocio
router.get("/emprendi/:id", topocinto_usuarios_compranmas);
module.exports = router;
