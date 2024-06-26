const dotenv = require("dotenv");
dotenv.config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const generationConfig = {
  temperature: 0.15,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const parts = [
  { text: "input: Care Schedule for Indoor Rose Plant" },
  {
    text: "output: Light: Bright, indirect light is best. Avoid direct sunlight, which can scorch the leaves.\n\nWater: soil evenly moist, but not soggy. Allow the top inch of soil to dry out between waterings.\n\nHumidity: high humidity. place on a pebble tray filled with water / mist the leaves regularly.\n\nTemperature: between 65-75°F (18-24°C). Avoid cold drafts.\n\nFertilizer:  balanced liquid fertilizer every two weeks during the growing season (spring and summer).",
  },
  { text: "input: Care Schedule for Indoor Lily Plant" },
  {
    text: "output: Light:  bright, indirect sunlight. Avoid direct sun\n\nWater: Water thoroughly until it drains, avoid letting it sit in water. water every 7-10 days.\n\nHumidity: use a pebble tray filled with water /  \n\nFertilizer: fertilize with a balanced houseplant fertilizer diluted to half strength (once a month)\n\nAdditional tips: \n. Wipe the leaves occasionally with a damp cloth to remove dust and improve their ability to absorb light.\n. Repot every 1-2 years or when the roots become pot-bound.",
  },
  { text: "input: Care Schedule for Indoor Snake Plant" },
  {
    text: "output: Light: bright, indirect sunlight. Avoid harsh, direct sun which can scorch the leaves.\n\nWatering: water when soil is dry\n\nTemperature: 65-80 Fahrenheit (They can tolerate cooler temps, but avoid letting them get below 50 degrees Fahrenheit).\n\nFertilizer: Snake plants are not heavy feeders. You can fertilize them once or twice during the growing season (spring and summer) with a diluted balanced houseplant fertilizer.",
  },
  {
    text: "input: Care Schedule for Indoor rubber Plant. Response details should be short, not detailed information",
  },
  {
    text: "output: Light: Bright, indirect light. Avoid direct sun.\n\nWater: Water when the top inch of soil is dry.\n\nHumidity:  Prefers moderate humidity.\n\nTemperature: 65-75°F (18-24°C). Avoid cold drafts.\n\nFertilizer: Fertilize every 4-6 weeks during the growing season.",
  },
  {
    text: "input: Care Schedule for Indoor pothos Plant. Response details should be short, not detailed information",
  },
  {
    text: "output: Light: Bright, indirect light. Avoid direct sun.\n\nWater: Water when the top inch of soil is dry.\n\nHumidity: Prefers moderate humidity.\n\nTemperature: 65-75°F (18-24°C). Avoid cold drafts.\n\nFertilizer: Fertilize every 4-6 weeks during the growing season.",
  },
  {
    text: "input: Care Schedule for outdoor Adenium obesum Plant. Response details should be short, not detailed information",
  },
  {
    text: "output: Light: Full sun to partial shade.\n\nWater: Water deeply when the soil is dry.\n\nHumidity: Prefers dry conditions.\n\nTemperature: Warm temperatures (above 60°F).\n\nFertilizer: Fertilize every 2-4 weeks during the growing season.",
  },
];



async function Gemini(search) {
    const prompt = `care schedule to my ${search} Plant`;
    console.log("search:", search);
    
    const result = await model.generateContent(prompt, {
      contents: [{ role: "user", parts }],
      generationConfig,
    });
    const text = result.response.text();
    console.log(text);
    return text;
}

module.exports = Gemini;
