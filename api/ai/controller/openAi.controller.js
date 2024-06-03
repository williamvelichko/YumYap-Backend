const { OpenAI } = require("openai");

const openAi = async (req, res) => {
  try {
    const userText = req.body.text;

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const prompt = [];
    prompt.push("Generate a recipe based on user's preference:");
    prompt.push(`User: ${userText}`);
    prompt.push(
      "Please provide a detailed recipe, including steps for preparation and cooking. Only use the ingredients provided."
    );
    prompt.push(
      "The recipe should highlight the fresh and vibrant flavors of the ingredients."
    );
    prompt.push(
      "Add the meals nutrition facts for the entire meal for one person, an example would be calories, carbs, sugar and more"
    );
    prompt.push(
      "Also, give the recipe a suitable name in its local language based on cuisine preference."
    );
    prompt.push("Return everything in an array as an object.");
    prompt.push(
      `The object must be structured like a json and a example would be this: {
        "name": "Chicken Tikka Masala",
        "cuisine": "Indian",
        "image": "https://www.example.com/chicken_tikka_masala.jpg",
        "people": 2,
        "cookTime": "35 minutes",
        "ingredients": {
          "1": "500g boneless, skinless chicken thighs, cut into bite-sized pieces",
          "2": "1 cup plain yogurt",
          "3": "2 tablespoons lemon juice",
          "4": "2 teaspoons ground cumin",
          "5": "2 teaspoons ground coriander",
          "6": "1 teaspoon ground turmeric",
          "7": "1 teaspoon chili powder",
          "8": "1 teaspoon paprika",
          "9": "2 teaspoons garam masala",
          "10": "2 tablespoons vegetable oil",
          "11": "1 large onion, finely chopped",
          "12": "4 cloves garlic, minced",
          "13": "1 tablespoon grated fresh ginger",
          "14": "1 can (400g) crushed tomatoes",
          "15": "1 cup heavy cream",
          "16": "Salt and pepper to taste",
          "17": "Fresh cilantro leaves, chopped (for garnish)"
        },
        "steps": {
          "1": "In a large bowl, combine the yogurt, lemon juice, ground cumin, ground coriander, ground turmeric, chili powder, paprika, and garam masala. Add the chicken pieces and toss to coat. Cover and refrigerate for at least 1 hour, or overnight for best results.",
          "2": "In a large skillet or saucepan, heat the vegetable oil over medium heat. Add the chopped onion and cook until softened, about 5 minutes. Add the minced garlic and grated ginger, and cook for another minute until fragrant.",
          "3": "Add the marinated chicken pieces to the skillet and cook until browned on all sides, about 5-7 minutes.",
          "4": "Stir in the crushed tomatoes and season with salt and pepper. Simmer uncovered for 15-20 minutes, stirring occasionally, until the sauce thickens and the chicken is cooked through.",
          "5": "Stir in the heavy cream and cook for another 5 minutes until heated through. Taste and adjust seasoning if necessary.",
          "6": "Garnish with chopped fresh cilantro leaves and serve hot with rice or naan bread."
        },
        "nutritionFacts": {
          "calories": "390 cal",
          "carbs": "24g",
          "sugar": "3g",
          "protein": "19g",
          "fat": "25g",
          "fiber": "5g"
        }
      }
      `
    );

    const messages = [{ role: "system", content: prompt.join(" ") }];
    const message = messages[0].content;

    const result = await fetchOpenAICompletionsStream(prompt.join(" "));

    let recipe = JSON.parse(result);

    // Generate image for the recipe name using OpenAI's DALL-E or similar model
    const imageUrl = await generateImageForRecipe(recipe.name);
    recipe.image = imageUrl;
    res.send(recipe);

    req.on("close", () => {
      res.end();
    });
  } catch (error) {
    console.error("Error in openAi:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function fetchOpenAICompletionsStream(prompt) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],
  });
  const responseText = completion.choices[0].message.content;
  return responseText;
}

async function generateImageForRecipe(recipeName) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  const imagePrompt = `Generate an image for the recipe: ${recipeName}`;

  const imageResult = await openai.images.generate({
    model: "dall-e-3",
    prompt: imagePrompt,
    n: 1,
    size: "1024x1024",
  });

  return imageResult.data[0].url;
}

module.exports = {
  openAi,
};
