var router = require("express").Router();
var db = require("../../db.cjs");

router.post("/", async (req, res) => {
  const { userId } = req.body;
  console.log("userId: ", userId);

  try {
    const getPlants = await db
      .collection("userPlants")
      .where("userid", "==", userId)
      .get();

    const plants = getPlants.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    //console.log(plants);
    if (plants.empty) {
      res.status(404).json({
        message: "no plants were found",
        status: "404 Bad Request",
      });
      return;
    } else {
      return res.status(200).json({
        message: "plants found",
        status: "200 OK",
        plants: plants,
      });
    }
  } catch (error) {
    console.log("Error fetching plants: ", error);
  }
});

router.post("/plant", async (req, res) => {
  const { plantId, userId } = req.body;
  
  try {
      db
      .collection("userPlants")
      .doc(plantId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // Document found, access data with doc.data()
          console.log(doc.data());
          if(userId !== doc.data().userid){
            res.status(404).json({
              message: "Unauthorized",
              status: "404 Not Found",
            });
            return;
          } else {
            return res.status(200).json({
              message: "plant found",
              status: "200 OK",
              plants: doc.data(),
            });
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
