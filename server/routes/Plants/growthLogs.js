var router = require("express").Router();
const db = require("../../db.cjs");
const gemini = require("../Gemini/gemini.js");
const firebase = require("firebase-admin");

router.post("/add", async (req, res) => {
  const { plantId, imageUrl, date, notes, height, leafCount } = req.body;

  if (!plantId || !imageUrl || !date || !notes) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // Add log to database
  try {
    const newLog = {
      imageUrl: imageUrl,
      notes: notes,
      height: height,
      leafCount: leafCount,
      date: date,
    };
    await db
      .collection("userPlants")
      .doc(plantId)
      .update({
        growthLogs: firebase.firestore.FieldValue.arrayUnion(newLog),
      })
      .then(() => {
        return res.status(200).json({
          message: "Log Added",
        });
      });
  } catch (error) {
    console.log("error: ", error);
    return res.status(401).json({
      message: "Error adding log",
    });
  }
});

router.post("/get", async (req, res) => {
  const { plantId, index } = req.body;

  try {
    db.collection("userPlants")
      .doc(plantId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // Document found, access data with doc.data()
          return res.status(200).json({
            message: "plant found",
            status: "200 OK",
            growthLog: doc.data().growthLogs[index],
          });
        } else {
          return res.status(404).json({
            message: "plant not found",
            status: "404 Not Found",
          });
        }
      });
  } catch (error) {
    console.log("Error fetching plant: ", error);
  }
});

router.delete("/delete", async (req, res) => {
  const { plantId, index, imageUrl } = req.body;

  try {
    db.collection("userPlants")
      .doc(plantId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // Document found, access data with doc.data()
          const growthLogs = doc.data().growthLogs;
          growthLogs.splice(index, 1);
          db.collection("userPlants")
            .doc(plantId)
            .update({
              growthLogs: growthLogs,
            })
            .then(() => {
              firebase
                .storage()
                .bucket()
                .file(imageUrl)
                .delete()
                .then(() => {
                  return res.status(200).json({
                    message: "Log Deleted",
                  });
                })
                .catch((error) => {
                  console.log("Error deleting image: ", error);
                  return res.status(401).json({
                    message: "Error deleting image",
                  });
                });
            });
        } else {
          return res.status(404).json({
            message: "plant not found",
            status: "404 Not Found",
          });
        }
      });
  } catch (error) {
    console.log("Error fetching plant: ", error);
  }
});



module.exports = router;
