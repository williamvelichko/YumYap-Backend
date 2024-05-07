const mongoose = require("mongoose");

const savedMealSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  meal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meal",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SavedMeal = mongoose.model("SavedMeal", savedMealSchema);

module.exports = SavedMeal;
