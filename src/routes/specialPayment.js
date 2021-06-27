const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
import {
  checkoutProducts,
  handlePayment,
} from "../Controllers/specialPaymentApi";
//Ruta que Genera un Checkout con Stripe
router.post("/checkout", checkoutProducts);

router.post(
  "/webhook/payment",

  handlePayment
);
module.exports = router;
