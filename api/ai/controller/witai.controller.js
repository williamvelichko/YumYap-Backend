const axios = require("axios");
const dotenv = require("dotenv").config();

async function parseQuery(query) {
  try {
    const WIT_AI_TOKEN = process.env.WIT_AI_TOKEN;
    const WIT_AI_ENDPOINT = `${process.env.WIT_AI_ENDPOINT}${encodeURIComponent(
      query
    )}`;

    const response = await axios.get(WIT_AI_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${WIT_AI_TOKEN}`,
      },
    });

    const { intents, entities } = response.data;

    return { intents, entities };
  } catch (error) {
    console.error("Error parsing query with Wit.ai:", error);
    throw new Error("Error parsing query with Wit.ai");
  }
}

async function handleRequest(req, res) {
  const { query } = req.body;

  try {
    const { intents, entities } = await parseQuery(query);

    res.json({ intents, entities });
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Error handling request" });
  }
}

module.exports = { handleRequest };
