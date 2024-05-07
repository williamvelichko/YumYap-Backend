const express = require("express");
const { connectDB, closeDB, getDB } = require("./db/db.config");
const dotenv = require("dotenv").config();
const app = express();
const authRouter = require("./api/auth/route/auth.route");
const aiRouter = require("./api/ai/route/ai.route");
const mealRouter = require("./api/meals/route/meals.routes");
const bodyParser = require("body-parser");

connectDB();

process.on("SIGINT", () => {
  closeDB();
  process.exit();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/ai", aiRouter);
app.use("/meal", mealRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
