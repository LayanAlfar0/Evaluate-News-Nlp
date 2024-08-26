var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const { analyzeURL } = require("./AnalyzeURL");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("dist"));

dotenv.config();

const port = process.env.PORT || 8000;
const API_KEY = process.env.API_KEY;

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.post("/", async (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }
  try {
    const analysis = await analyzeURL(url, API_KEY);
    res.json(analysis);
  } catch (error) {
    console.error("Error processing the URL analysis:", error);
    res.status(500).json({ error: "Failed to process URL analysis" });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});
