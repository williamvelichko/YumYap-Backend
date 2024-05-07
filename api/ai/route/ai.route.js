const { parseQuery } = require("../controller/ai.controller");
const express = require("express");
const { handleRequest } = require("../controller/witai.controller");
const { geminiAi } = require("../controller/gemeniAi.controller");
const { openAi } = require("../controller/openAi.controller");
const router = express.Router();

router.post("/chat", parseQuery);
router.post("/openAi", openAi);
router.post("/geminiChat", geminiAi);
module.exports = router;
