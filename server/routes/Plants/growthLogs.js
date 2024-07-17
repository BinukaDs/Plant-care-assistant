var router = require("express").Router();
const db = require("../../db.cjs");
const gemini = require("../Gemini/gemini.js");
const firebase = require("firebase-admin");
const { doc, updateDoc } = require("firebase/firestore");
const { ref, deleteObject } = require("firebase/storage");

const storage = require("../../firebase.js");

router.post("/add", async (req, res) => {
  const { plantId, imageUrl, date, notes, height, leafCount, imageName } =
    req.body;

  const log = [date, imageUrl, imageName, notes, height, leafCount].every(
    (variable) => Boolean(variable)
  );

  if (!log) {
    return res.status(400).json({ message: "All fields are required" });
  } else if (log) {
    // Add log to database
    try {
      const newLog = {
        imageUrl: imageUrl,
        imageName: imageName,
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
          return res.status(201).send("Log added successfully");
        });
    } catch (error) {
      console.log("error: ", error);
      return res.status(401).json({
        message: "Error adding log",
      });
    }
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

router.put("/edit", async (req, res) => {
  const {
    plantId,
    index,
    date,
    imageUrl,
    notes,
    height,
    leafCount,
    imageName,
  } = req.body;
  console.log(req.body);
  const log = [date, imageUrl, imageName, notes, height, leafCount].every(
    (variable) => Boolean(variable)
  );

  if (!log) {
    return res.status(400).json({ message: "All fields are required" });
  } else if (log) {
    try {
      const target = doc(db, "userPlants", plantId);
      const snapshot = await getDoc(target);

      if (!snapshot.exists()) {
        console.log("Document does not exist!");
        return res.status(404).send("Document not found");
      }

      const existingLogs = snapshot.data().growthLogs;
      const updatedLogs = [...(existingLogs || []), log];

      const docRef = db.collection("userPlants").doc(plantId);
      
      docRef.update({
        [`growthLogs.${index}`]: updatedLogs,
      });

      return res.status(200).send("Log updated successfully");
    } catch (error) {
      console.log("Error updating Log:", error);
      return res.status(500).send("Error updating log");
    }
  }
});

router.delete("/delete", async (req, res) => {
  const { userId, plantId, index, imageName } = req.body;

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
              const imageRef = ref(storage, `images/${userId}/${imageName}`);

              // Delete the file
              deleteObject(imageRef)
                .then(() => {
                  return res.status(200).json({
                    message: "growthLog deleted!",
                  });
                })
                .catch((error) => {
                  console.log("Error deleting Image: ", error);
                  return res.status(401).json({
                    message: "Error deleting Image",
                    fileName: imageName,
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
    console.log("Error deleting plant: ", error);
  }
});

module.exports = router;
