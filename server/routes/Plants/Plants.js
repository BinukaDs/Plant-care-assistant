var router = require("express").Router();
const db = require("../../db.cjs");
const gemini = require("../Gemini/gemini.js");
const removeBg = require("../imageUpdate/bgremoval.js");
const { ref, deleteObject } = require("firebase/storage");
const storage = require("../../firebase.js");

const addPlant = async (req, res) => {
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
  const plant = `${environment} ${species}`;
  //const careGuide = await gemini(plant);

  // Add plant to database
  try {
    const newPlant = await db.collection("userPlants").add({
      userId,
      nickname,
      location,
      species,
      environment,
      imageUrl,
      imageName,
      //careGuide,
      growthLogs: [],
    });

    if (newPlant) {
      //removeBg(imageUrl)
      return res.status(201).json({
        message: "Plant Created",
      });
    }
  } catch (err) {
    console.log("err: ", err);
    return res.status(401).json({
      message: "Error Creating plant",
    });
  }
};

const getPlants = async (req, res) => {
  const { UserId } = req.body;

  try {
   
    const getPlants = await db
      .collection("userPlants")
      .where("userId", "==", UserId)
      .get();

    const plants = await getPlants.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (plants.length > 0) {
      return res.status(200).json({
        message: "plants found",
        status: "200 OK",
        plants: plants,
      });
    } else {
      res.status(404).json({
        message: "no plants were found",
        status: "404",
      });
      return;
    }
  } catch (error) {
    console.log("Error fetching plants: ", error);
  }
};

const getPlant = async (req, res) => {
  const { plantId, userId } = req.body;

  try {
    db.collection("userPlants")
      .doc(plantId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // Document found, access data with doc.data()
          if (userId) {
            if (userId !== doc.data().userId) {
              res.status(404).json({
                message: "Unauthorized",
                status: "404 Not Found",
              });
              console.log("Unauthorized");
              return;
            } else if (userId === doc.data().userId) {
              return res.status(200).json({
                message: "plant found",
                status: "200 OK",
                plant: doc.data(),
              });
            }
          }
        } else {
          res.status(404).json({
            message: "no plants were found",
            status: "404 Bad Request",
          });
          console.log("No Plants were found!");
          return;
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  } catch (error) {
    console.log("Error Fetching Plant: ", error);
  }
};

const deletePlant = async (req, res) => {
  const { userId, plantId, imageName } = req.body;
  console.log("PlantId: ", plantId);

  if (!plantId) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // Delete plant from database
  try {
    db.collection("userPlants")
      .doc(plantId)
      .delete()
      .then(() => {
        const imageRef = ref(storage, `images/${userId}/${imageName}`);
        // Delete the file
        deleteObject(imageRef)
          .then(() => {
            return res.status(200).json({
              message: "Plant Deleted!",
            });
          })
          .catch((error) => {
            console.log("Error deleting Image: ", error);
            return res.status(401).json({
              message: "Error deleting Image",
              fileName: imageName,
            });
          });
      })
      .catch((error) => {
        console.log("Error deleting document: ", error);
      });
  } catch (err) {
    console.log("err: ", err);
    return res.status(401).json({
      message: "Error deleting plant",
    });
  }
};

router.post("/add", addPlant);
router.post("/get", getPlants);
router.post("/plant/get", getPlant);
router.delete("/plant/delete", deletePlant);

module.exports = router;
module.exports = getPlants;