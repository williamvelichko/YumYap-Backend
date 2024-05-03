const express = require("express");
const { connectDB, closeDB } = require("./db/db.config");
const dotenv = require("dotenv").config();
const app = express();
connectDB();

process.on("SIGINT", () => {
  closeDB();
  process.exit();
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
