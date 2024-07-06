var router = require("express").Router();
var db = require("../../db.cjs");

router.post("/", async (req, res) => {
  const { UserId } = req.body;

  try {
    const getPlants = await db
      .collection("userPlants")
      .where("userId", "==", UserId)
      .get();

    const plants = getPlants.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    //console.log(plants);
    if (!plants.empty) {
      return res.status(200).json({
        message: "plants found",
        status: "200 OK",
        plants: plants,
      });
    } else {
      res.status(404).json({
        message: "no plants were found",
        status: "404 Bad Request",
      });
      return;
    }
  } catch (error) {
    console.log("Error fetching plants: ", error);
  }
});

router.post("/plant", async (req, res) => {
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
});

module.exports = router;
