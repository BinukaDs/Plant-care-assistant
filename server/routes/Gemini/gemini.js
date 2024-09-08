var router = require("express").Router();
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 0.15,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
const parts = [
  {
    input: "indoor rose plant care guide",
    output: {
      Feature: "Description",
      Light: "6-8 hours daily, bright indirect sunlight",
      Water: "When top inch of soil feels dry",
      Temperature: "65-75°F (18-24°C) daytime, 50-60°F (10-16°C) nighttime",
      Fertilize: "Every 2-4 weeks during growing season (spring/summer)",
      "Additional tips":
        "Deadhead spent blooms regularly. Prune in late winter/early spring.",
    },
  },
  {
    input: "Outdoor Anthurium plant care guide",
    output: {
      Feature: "Description",
      Light: "Filtered sunlight, avoid direct sun",
      Water: "When top 1-2 inches of soil feels dry",
      Temperature: "65-85°F (18-29°C)",
      Fertilize: "Monthly during spring and summer",
      "Additional tips":
        "Monitor temperature. Bring indoors if below 60°F (15°C).",
    },
  },
  {
    input: "Indoor Lily plant care guide",
    output: {
      Feature: "Description",
      Light: "Indirect light",
      Water: "Water when top 1-2 inches of soil dry",
      Temperature: "60-75°F (15-24°C)",
      Fertilize: "Monthly during spring/summer (optional)",
      "Additional tips":
        "Wipe leaves with damp cloth for shine. Consider using a humidifier for dry climates.",
    },
  },
  {
    input: "Outdoor Begonia plant care guide",
    output: {
      Feature: "Description",
      Light: "Part shade to filtered sunlight",
      Water: "Regularly, allowing soil to dry slightly between waterings",
      Temperature: "60-80°F (15-27°C)",
      Fertilize:
        "Balanced fertilizer every 2-4 weeks during spring/summer (optional)",
      "Additional tips":
        "Deadhead spent flowers to encourage new blooms. Bring indoors before frost (if in colder climates).",
    },
  },
  {
    input: "Indoor Cactus plant care guide",
    output: {
      Feature: "Description",
      Light: "Bright, indirect sunlight",
      Water:
        "Infrequent watering, allow soil to dry completely between waterings",
      Temperature: "60-85°F (15-29°C)",
      Fertilize: "Monthly during spring/summer with diluted cactus fertilizer",
      "Additional tips": "Repot every 2-3 years in well-draining cactus soil.",
    },
  },
  {
    input: "Indoor aloe vera plant care guide",
    output: {
      Feature: "Description",
      Light: "Bright indirect sunlight or partial shade",
      Water: "Allow soil to dry out completely between waterings",
      Temperature: "65-80°F (18-27°C)",
      Fertilize:
        "Optional, dilute balanced fertilizer once a month during growing season",
      "Additional tips":
        "Cuttings can be used to propagate new plants. Use well-draining soil.",
    },
  },
];

async function Gemini(search) {
  const prompt = `Give me an ${search} plant care guide. Don't use any other greeting phrases or sentences. give only these specific details. and if the plant has any special care instructions, give them in short sentence in 10-30 words. at the end of the specific details. I will give you the specific details I need. and give me the answer in markdown format including these details and the special instructions into a table in markdown format.

              Light: (frequency: 5-10 words)
              water: (frequency: 5-10 words)
              Temperature: (in F and C : 5-10 words)
              Fertilize: (5-15 words)
              Additional tips: (10-30 words)`;

  console.log("search:", prompt);
  const result = await model.generateContent(prompt, {
    contents: [{ role: "user", parts }],
    generationConfig,
  });

  const text = result.response.text();
  console.log(text);
  return text;
}

router.post("/", async (req, res) => {
  const { search } = req.body;
  console.log("search:", search);
  try {
    const response = await Gemini(search);
    res.status(200).json({
      message: "Gemini generated",
      status: "200 OK",
      response: response,
    });
  } catch (error) {
    console.error("Error generating Gemini:", error);
    res.status(500).send(error);
  }
});

module.exports = Gemini;
module.exports = router;
