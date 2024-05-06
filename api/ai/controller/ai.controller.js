const axios = require("axios");
const dotenv = require("dotenv").config();
const { generateSessionId } = require("../service/ai.service");

// Function to make NLP request to Dialogflow
async function parseQuery(req, res) {
  const { query } = req.body;
  console.log(query);
  try {
    const sessionId = generateSessionId(); // Generate a session ID if needed
    const NLP_ENDPOINT = `https://dialogflow.googleapis.com/v2/projects/yumyap/agent/sessions/${sessionId}:detectIntent`;
    const requestBody = {
      queryInput: {
        text: {
          text: query,
          languageCode: "en", // Adjust language code as needed
        },
      },
    };

    const response = await axios.post(NLP_ENDPOINT, requestBody, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const { queryResult } = response.data;
    const intent = queryResult.intent.displayName;
    const parameters = queryResult.parameters.fields;

    res.json({ intent, parameters });
  } catch (error) {
    console.error("Error parsing query with NLP:", error);
    res.status(500).json({ error: "Error parsing query with NLP" });
  }
}

module.exports = { parseQuery };
