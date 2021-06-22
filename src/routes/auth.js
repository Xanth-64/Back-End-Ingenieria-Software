import { signUp, login } from "../Controllers/auth";
const express = require("express");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);

module.exports = router;
