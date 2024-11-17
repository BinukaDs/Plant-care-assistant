var router = require("express").Router();
const { Filter } = require("firebase-admin/firestore");
const db = require("../../db.cjs");
const GenerateSpecies = require("../Gemini/gemini");

const addSpecies = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      message: "Name is required!",
      status: 400,
    });
  }
  try {
    const species = await GenerateSpecies(name);
    // console.log("Generated");
    if (species) {
      // console.log("Checking");
      const isSpeciesAvailable = await db
        .collection("species")
        .where(
          Filter.or(
            Filter.where("name", "==", species.name),
            Filter.where("scientificName", "==", species.scientificName)
          )
        )
        .get();
      if (isSpeciesAvailable.docs.length > 0) {
        return res.status(400).json({
          message: "Species already exists!",
          status: 400,
        });
      } else {
        // console.log("adding");
        const newSpecies = await db.collection("species").add(species);
        if (newSpecies) {
          return res.status(200).json({
            message: "Species added!",
            status: 200,
            species: newSpecies,
          });
        } else {
          return res.status(500).json({
            message: "Error adding species!",
            status: 500,
          });
        }
      }
    }
  } catch (error) {
    console.log("Error adding species: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500,
    });
  }
};

const getSpecies = async (req, res) => {
  const { species } = req.body;
  try {
    const getSpecies = await db
      .collection("species")
      .where("name", "==", species)
      .get();

    const speciesData = getSpecies.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (speciesData.length > 0) {
      return res.status(200).json({
        message: "Species found!",
        status: 200,
        species: speciesData,
      });
    } else {
      return res.status(404).json({
        message: "Species not found!",
        status: 404,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500,
    });
  }
};

const getAllSpecies = async (req, res) => {
  try {
    const species = await db.collection("species").get();
    const speciesList = species.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (speciesList.length > 0) {
      return res.status(200).json({
        message: "Species found!",
        status: 200,
        species: speciesList,
      });
    } else {
      return res.status(404).json({
        message: "No species were found!",
        status: 404,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500,
    });
  }
};

const getSpeciesFiltered = async (req, res) => {
  try {
    const species = await db
      .collection("species")
      .select("name", "scientificName")
      .get();
      
    const speciesList = species.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (speciesList.length > 0) {
      return res.status(200).json({
        message: "Species found!",
        status: 200,
        species: speciesList,
      });
    } else {
      return res.status(404).json({
        message: "No species were found!",
        status: 404,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500,
    });
  }
};

router.get("/", getAllSpecies);
router.get("/filtered", getSpeciesFiltered);
router.post("/species", getSpecies);
router.post("/add", addSpecies);

module.exports = router;
