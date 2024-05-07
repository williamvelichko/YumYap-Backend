const fetch = require("node-fetch"); // Import the 'node-fetch' library

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
      "Also, give the recipe a suitable name in its local language based on cuisine preference."
    );
    prompt.push("Provide a Google image URL as well.");
    prompt.push("Return everything in an array as an object.");
    prompt.push(
      'The object must be structured like this: { "name": "", "cuisine": "", "image": "", "ingredients": [], "steps": [] }'
    );

    const messages = [{ role: "system", content: prompt.join(" ") }];
    const message = messages[0].content;

    const result = await fetchOpenAICompletionsStream(message); // Call the function to fetch completions from OpenAI
    res.send(result);

    req.on("close", () => {
      res.end();
    });
  } catch (error) {
    console.error("Error in geminiAi:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function fetchOpenAICompletionsStream(prompt) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Get the OpenAI API key from environment variables
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`, // Set the authorization header with the API key
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // Specify the OpenAI model
      prompt: prompt,
      max_tokens: 150, // Adjust as needed
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API request failed with status ${response.status}`);
  }

  const json = await response.json(); // Parse the JSON response
  console.log(json);
  return json.choices[0].text; // Extract the text from the response
}

module.exports = {
  openAi,
};
