const express = require("express");
const {
  saveMeal,
  getAllSavedMeals,
  deleteSavedMeal,
} = require("../controller/meals.controller");
const router = express.Router();

router.post("/saveMeal/:id", saveMeal);
router.get("/get/:id", getAllSavedMeals);
router.delete("/delete/:mealId", deleteSavedMeal);

module.exports = router;
