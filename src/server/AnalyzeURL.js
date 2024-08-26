const axios = require("axios");

const BASE_URL = "https://api.meaningcloud.com/sentiment-2.1";

const analyzeURL = async (url, key) => {
  if (!url || !key) {
    return { error: "API key and URL must be provided." };
  }

  try {
    const response = await axios.get(`${BASE_URL}?key=${key}&url=${url}&lang=en`);
    const { data } = response;
    if (data.status.code != 0) { 
      return {
        error: `${data.status.msg} (${data.status.code === '100' ? 'Check API key or URL' : ''})`
      };
    }
    return {
      score_tag: data.score_tag,
      agreement: data.agreement,
      subjectivity: data.subjectivity,
      confidence: data.confidence,
      irony: data.irony,
    };
  } catch (error) {
    console.error("Error communicating with MeaningCloud API:", error);
    return { error: "Error communicating with MeaningCloud API" };
  }
};

module.exports = { analyzeURL };
