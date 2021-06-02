import { signUp, login } from "../Controllers/auth";
const express = require("express");
const router = express.Router();

router.get("/login", login);
router.get("/signup", signUp);

module.exports = router;
