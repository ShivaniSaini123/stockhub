const express = require("express");
const { login, register } = require("../controllers/user.controller");

const router = express.Router();
// to redirect to login
router.post("/login", login);
// to redirect to register
router.post("/register", register);

module.exports = router;

