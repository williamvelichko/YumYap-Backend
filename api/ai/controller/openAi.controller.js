const { generatePrompt } = require("../prompt/prompt");
const {
  fetchOpenAICompletionsStream,
  generateImageForRecipe,
} = require("../service/openai.service");

const openAi = async (req, res) => {
  try {
    const userText = req.body.text;

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const prompt = generatePrompt(userText);
    const result = await fetchOpenAICompletionsStream(prompt);
    let recipe = JSON.parse(result);

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

module.exports = {
  openAi,
};
