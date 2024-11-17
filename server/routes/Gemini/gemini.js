const ScientificNameTuningData = require("./TuningData/ScientificName.json");
const DescriptionTuningData = require("./TuningData/Description.json");
const CareGuidesTuningData = require("./TuningData/CareGuides.json");
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

const processTuningData = (tuningData) => {
  return tuningData.map((guide) => {
    return {
      input: guide.input,
      output: guide.output,
    };
  });
};

const GenerateSpecies = async (name) => {
  let species = {
    name: name,
    scientificName: "",
    description: "",
    careGuide: "",
  };

  const ScientificNamePrompt = `I will give you a name of a plant. I need you to give me the scientific name of the plant. make the response only included with the species, no any other things(no need to style the response text). Plant: ${name}`;
  await model
    .generateContent(ScientificNamePrompt, {
      contents: [
        { role: "user", parts: processTuningData(ScientificNameTuningData) },
      ],
      generationConfig,
    })
    .then(async (result) => {
      species.scientificName = result.response.text();
      const DescriptionPrompt = `I will give you a plant species. I need you to write a 60-70 words Intro-Description about that species. I will give you the points to include. Points: 1. Description of the species(10-20 words). 2. The origin of the plant(10-20 words). 3. The uses of the species(20-30 words). make the response only included with the species, no any other things(no need to style the response text). Species: ${result.response.text()}`;
      await model
        .generateContent(DescriptionPrompt, {
          contents: [
            { role: "user", parts: processTuningData(DescriptionTuningData) },
          ],
          generationConfig,
        })
        .then(async (result) => {
          species.description = result.response.text();
          const CareGuidePrompt = `I will give you a plant species. I need you to write a care guide for that species. I will give you the points to include. Points: 1. Light: (frequency: 5-10 words). 2. water: (frequency: 5-10 words). 3. Temperature: (in F and C : 5-10 words). 4. Fertilize: (5-15 words). 5. Additional tips: (10-30 words). make the whole thing as a description including 3-5 paragraphs with 50-70 words. make the response only included with the careguide as a single description, hightlight the points with their  in the care guide with bolding in markdown format. no any other things(no need to style the response text). Species: ${result.response.text()}`;
          await model
            .generateContent(CareGuidePrompt, {
              contents: [
                {
                  role: "user",
                  parts: processTuningData(CareGuidesTuningData),
                },
              ],
              generationConfig,
            })
            .then((result) => {
              species.careGuide = result.response.text();
              return species;
            });
        });
    });

  // console.log("species: ",species);
  return species;
};

module.exports = GenerateSpecies;
