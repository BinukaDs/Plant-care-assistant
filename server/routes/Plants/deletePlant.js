const router = require("express").Router();
const db = require("../../db.cjs");
const { ref, deleteObject } = require("firebase/storage");
const storage = require("../../firebase.js");

router.delete("/", async (req, res) => {
  const { plantId } = req.body;
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
      .get()
      .then((doc) => {
        if (doc.exists) {
          const imageName = doc.data().imageName;
          const userId = doc.data().userId;
          db.collection("userPlants")
            .doc(plantId)
            .delete()
            .then(() => {
              const desertRef = ref(storage, `images/${userId}/${imageName}`);
              // Delete the file
              deleteObject(desertRef)
                .then(() => {
                  return res.status(200).json({
                    message: "Plant Deleted!",
                  });
                })
                .catch((error) => {
                  console.log("Error deleting Image: ", error)
                  return res.status(401).json({
                    message: "Error deleting Image",
                    fileName: doc.data().imageName
                  });
                });
            });

          
        }
      });
  } catch (err) {
    console.log("err: ", err);
    return res.status(401).json({
      message: "Error deleting plant",
    });
  }
});

module.exports = router;
