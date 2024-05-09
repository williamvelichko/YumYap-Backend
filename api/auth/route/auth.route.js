const {
  registerUser,
  loginUser,
  resetPassword,
} = require("../controller/auth.controller");
const express = require("express");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/resetPassword", resetPassword);

module.exports = router;
