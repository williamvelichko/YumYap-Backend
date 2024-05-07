const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv").config();

const geminiAi = async (req, res) => {
  try {
    const userText = req.body.text;

    res.setHeader("Content-Type", "application/json"); // Set content type to JSON
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
      "Also, give the recipe a suitable name in its local language based on cuisine preference."
    );
    prompt.push("Provide a Google image URL as well.");
    prompt.push("Return everything in an array as an object.");
    prompt.push(
      'The object must be structured like this: { "name": "", "cuisine": "", "image": "", "ingredients": [], "steps": [] }'
    );

    const messages = [{ role: "system", content: prompt.join(" ") }];
    const message = messages[0].content;

    const result = await fetchGeminiCompletionsStream(message);
    res.send(result); // Send the JSON response

    req.on("close", () => {
      res.end();
    });
  } catch (error) {
    console.error("Error in geminiAi:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function fetchGeminiCompletionsStream(messages) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  const aiModel = "gemini-pro";
  const model = genAI.getGenerativeModel({ model: aiModel });

  try {
    const result = await model.generateContent(messages);
    const response = await result.response;
    const text = response.text();
    const jsonStr = text.replace(/^```json\n|```$/g, ""); // Remove code block markers
    return JSON.parse(jsonStr); // Parse the JSON string and return the object
  } catch (error) {
    console.error("Error fetching data from Gemini AI API:", error);
    throw new Error("Error fetching data from Gemini AI API.");
  }
}

module.exports = {
  geminiAi,
};
