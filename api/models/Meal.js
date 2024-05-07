const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Map,
    of: String,
    required: true,
  },
  steps: {
    type: Map,
    of: String,
    required: true,
  },
  people: {
    type: Number,
    required: true,
  },
  cookTime: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
