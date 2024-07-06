var router = require("express").Router();
const db = require("../../db.cjs");
const gemini = require("../Gemini/gemini.js");

router.post("/", async (req, res) => {
  const {
    userId,
    nickname,
    location,
    species,
    environment,
    imageUrl,
    imageName,
  } = req.body;
  console.log(
    userId,
    nickname,
    location,
    species,
    environment,
    imageUrl,
    imageName
  );

  if (
    !userId ||
    !nickname ||
    !location ||
    !species ||
    !environment ||
    !imageUrl ||
    !imageName
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  gemini(species);

  // Add plant to database
  try {
    const newPlant = await db
      .collection("userPlants")
      .add({
        userId,
        nickname,
        location,
        species,
        environment,
        imageUrl,
        imageName,
        growthLogs: [],
      });

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
