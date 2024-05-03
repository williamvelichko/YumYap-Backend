const { registerUser, loginUser } = require("../controller/auth.controller");
const express = require("express");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
