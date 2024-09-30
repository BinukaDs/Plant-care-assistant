var router = require("express").Router();
const db = require("../../db.cjs");

const getLocations = async (req, res) => {
  const { userId } = req.body;
  try {
    const getLocations = await db
      .collection("userLocations")
      .where("userId", "==", userId)
      .get();

    const locations = await getLocations.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (locations.length > 0) {
      //console.log(locations);
      return res.status(200).json({
        message: "locations found",
        status: "200 OK",
        locations: locations,
      });
    } else {
      res.status(404).json({
        message: "no locations were found",
        status: "404",
      });
      return;
    }
  } catch (error) {
    console.log("Error fetching locations:", error);
    return res.status(500).send(error);
  }
};

const addLocation = async (req, res) => {
  const { userId, location, environment } = req.body;
  console.log(location, userId, environment);
  if (!userId || !location || !environment) {
    console.log(userId, location, environment);
    return res.status(400).json({ message: "all fields are required" });
  } else if (location) {
    const isLocationAvailable = await db
      .collection("userLocations")
      .where("userId", "==", userId)
      .where("locations", "==", location)
      .get();

    if (isLocationAvailable.docs.length > 0) {
      return res.status(400).json({
        message: "Location already exists",
        status: 400,
      });
    }
    try {
      const addLocation = await db
        .collection("userLocations")
        .add({ location, environment, userId });

      if (addLocation) {
        return res.status(201).json({
          message: "location added!",
          status: 201,
        });
      }
    } catch (error) {
      console.log("Error adding location:", error);
      return res.status(500).send(error);
    }
  }
};

const deleteLocation = async (req, res) => {
  const { locationId } = req.body;
  if (!locationId) {
    return res.status(400).json({ message: "all fields are required" });
  } else if (locationId) {
    try {
      const deleteLocation = await db
        .collection("userLocations")
        .doc(locationId)
        .delete();

      if (deleteLocation) {
        return res.status(201).json({
          message: "location deleted!",
          status: 200,
        });
      }
    } catch (error) {
      console.log("Error deleting location:", error);
      return res.status(500).send(error);
    }
  }
};

const updateLocation = async (req, res) => {
  const { locationId, location, environment } = req.body;
  console.log(locationId, location, environment)
  if (!locationId || !location || !environment) {
    return res.status(400).json({ message: "all fields are required" });
  } else if (locationId) {
    try {
      const docRef = db.collection("userLocations").doc(locationId);
      docRef.get().then(async (doc) => {
        if (!doc.exists) {
          console.log("Location does not exist!");
          return res.status(404).send("Location not found");
        } else if (doc.exists) {
          const updateLocation = await db
            .collection("userLocations")
            .doc(locationId)
            .update({
              location,
              environment,
            });

          if (updateLocation) {
            return res.status(201).json({
              message: "location updated!",
              status: 200,
            });
          }
        }
      });
    } catch (error) {
      console.log("Error updating location:", error);
      return res.status(500).send(error);
    }
  }
};

router.post("/", getLocations);
router.post("/add", addLocation);
router.patch("/update", updateLocation);
router.delete("/delete", deleteLocation);

module.exports = router;
