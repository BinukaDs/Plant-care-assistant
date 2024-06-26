var router = require("express").Router();
const db = require("../../db.cjs");
const gemini = require("../Gemini/gemini.js")

router.post("/", async (req, res) => {
  const { userid, nickname, location, species, environment } = req.body;
  console.log(userid, nickname, location, species, environment);

  if (!userid || !nickname || !location || !species || !environment) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  gemini(species)
  

  // Add plant to database
  try {
    const newPlant = await db
      .collection("userPlants")
      .add({ userid, nickname, location, species, environment });

    if (newPlant) {
      return res.status(200).json({
        message: "Plant Added",
      });
    }
  } catch (err) {
    console.log("err: ", err);
    return res.status(401).json({
      message: "Error adding plant",
    });
  }
});

module.exports = router;
