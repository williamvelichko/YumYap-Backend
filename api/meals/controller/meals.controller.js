const Meal = require("../../models/Meal");
const SavedMeal = require("../../models/SavedMeal");

const saveMeal = async (req, res) => {
  try {
    const fullMeal = req.body;
    const userId = req.params.id;
    const meal = new Meal(fullMeal);
    await meal.save();

    const savedMeal = new SavedMeal({
      user: userId,
      meal: meal._id,
    });

    // Save the saved meal entry to the database
    await savedMeal.save();

    res.status(201).json({ message: "Meal saved successfully", savedMeal });
  } catch (error) {
    console.error("Error saving meal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllSavedMeals = async (req, res) => {
  try {
    const userId = req.params.id;
    const savedMeals = await SavedMeal.find({ user: userId }).populate("meal");

    res.status(200).json(savedMeals);
  } catch (error) {
    console.error("Error getting saved meals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a saved meal
const deleteSavedMeal = async (req, res) => {
  try {
    const savedMealId = req.params.mealId;

    await SavedMeal.findByIdAndDelete(savedMealId);

    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error("Error deleting saved meal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  saveMeal,
  getAllSavedMeals,
  deleteSavedMeal,
};
