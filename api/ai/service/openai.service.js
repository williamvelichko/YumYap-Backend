const { OpenAI } = require("openai");

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
  fetchOpenAICompletionsStream,
  generateImageForRecipe,
};
