var router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();

const { VertexAI } = require("@google-cloud/vertexai");

const generate_from_text_input = async (req, res) => {
  const vertexAI = new VertexAI({
    project: "plant-care-assistant-database",
    location: "us-central1",
    apiEndpoint: "https://us-central1-aiplatform.googleapis.com",
  });

  const generativeModel = vertexAI.getGenerativeModel({
    model: "gemini-1.5-flash-001",
  });

  const prompt =
    "What's a good name for a flower shop that specializes in selling bouquets of dried flowers?";

  const resp = await generativeModel.generateContent(prompt);
  const contentResponse = await resp.response;
  console.log(JSON.stringify(contentResponse));
};

router.post("/", generate_from_text_input);

module.exports = router;
