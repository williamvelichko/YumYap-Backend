const {
  getUserById,
  deleteUserById,
  getAllUsers,
} = require("../controller/user.controller.js");
const express = require("express");
const router = express.Router();

router.get("/get/:userId", getUserById);
router.delete("/delete/:userId", deleteUserById);
router.get("/", getAllUsers);

module.exports = router;
