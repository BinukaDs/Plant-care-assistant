var router = require("express").Router();
const db = require("../../db.cjs");
const gemini = require("../Gemini/gemini.js");
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
    console.log(userId, nickname, location, species, environment, imageUrl, imageName)
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
        message: "Plant created successfully!",
        status: "201",
      });
    }
  } catch (err) {
    console.log("err: ", err);
    return res.status(401).json({
      message: "Error Creating plant",
      status: "201",
    });
  }
};

const getPlants = async (req, res) => {
  const { UserId } = req.body;
  console.log("userId:", UserId);

  if (!UserId) {
    return res.status(400).json({ message: "userId is required" });
  } else if (UserId) {
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
      res.status(500).send(error);
    }
  }
};

const getPlant = async (req, res) => {
  const { plantId, userId } = req.body;

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
            console.log("plantfound:", doc.data());
            return res.status(200).json({
              message: "plant found",
              status: "200 OK",
              plant: doc.data(),
            });
          }
        }
      } else {
        res.status(404).json({
          message: "couldn't find the plant!",
          status: "404 Bad Request",
        });
        console.log("couldn't find the plant!");
        return;
      }
    });
};

const deletePlant = async (req, res) => {
  const { userId, plantId, imageName } = req.body;
  console.log("PlantId: ", plantId);

  if (!plantId) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const imageRef = ref(storage, `images/${userId}/${imageName}`);
  // Delete the file
  deleteObject(imageRef)
    .then(() => {
      db.collection("userPlants")
        .doc(plantId)
        .delete()
        .then(() => {
          return res.status(200).json({
            message: "Plant Deleted!",
            status: 200,
          });
        })
        .catch((error) => {
          console.log("Error deleting Plant: ", error);
          return res.status(401).json({
            message: "Error deleting Plant",
            fileName: imageName,
            status: 401,
          });
        });
    })
    .catch((error) => {
      console.log("Error deleting Image: ", error);
      return res.status(401).json({
        message: "Error deleting Image",
        status: 401,
      });
    });
};

router.post("/add", addPlant);
router.post("/", getPlants);
router.post("/plant", getPlant);
router.delete("/plant/delete", deletePlant);

module.exports = router;
