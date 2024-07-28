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
  {text: "input: indoor rose plant care guide"},
  {text: "output: | Feature | Description |\n|---|---|\n| Light | 6-8 hours daily, bright indirect sunlight |\n| Water | When top inch of soil feels dry |\n| Temperature | 65-75°F (18-24°C) daytime, 50-60°F (10-16°C) nighttime |\n| Fertilize | Every 2-4 weeks during growing season (spring/summer) |\n| Additional tips | Deadhead spent blooms regularly. Prune in late winter/early spring. |"},
  {text: "input: Outdoor Anthurium plant care guide"},
  {text: "output: | Feature | Description |\n|---|---|\n| Light | Filtered sunlight, avoid direct sun |\n| Water | When top 1-2 inches of soil feels dry |\n| Temperature | 65-85°F (18-29°C) |\n| Fertilize | Monthly during spring and summer |\n| Additional tips | Monitor temperature. Bring indoors if below 60°F (15°C). |"},
  {text: "input: Indoor Lily plant care guide"},
  {text: "output: | Feature | Description |\n|---|---|\n| Light | Indirect light |\n| Water | Water when top 1-2 inches of soil dry |\n| Temperature | 60-75°F (15-24°C) |\n| Fertilize | Monthly during spring/summer (optional) |\n| Additional tips | Wipe leaves with damp cloth for shine. Consider using a humidifier for dry climates. |"},
  {text: "input: Outdoor Begonia plant care guide"},
  {text: "output: | Feature | Description |\n|---|---|\n| Light | Part shade to filtered sunlight |\n| Water | Regularly, allowing soil to dry slightly between waterings |\n| Temperature | 60-80°F (15-27°C) |\n| Fertilize | Balanced fertilizer every 2-4 weeks during spring/summer (optional) |\n| Additional tips | Deadhead spent flowers to encourage new blooms. Bring indoors before frost (if in colder climates). |"},
  {text: "input: Indoor Cactus plant care guide"},
  {text: "output: | Feature | Description |\n|---|---|\n| Light | Bright, indirect sunlight |\n| Water | Infrequent watering, allow soil to dry completely between waterings |\n| Temperature | 60-85°F (15-29°C) |\n| Fertilize | Monthly during spring/summer with diluted cactus fertilizer |\n| Additional tips | Repot every 2-3 years in well-draining cactus soil. |"}
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

module.exports = Gemini;
