const { parseQuery } = require("../controller/ai.controller");
const express = require("express");
const { handleRequest } = require("../controller/witai.controller");
const router = express.Router();

router.post("/chat", parseQuery);
router.post("/chat3", handleRequest);
module.exports = router;
