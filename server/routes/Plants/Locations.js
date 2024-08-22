var router = require("express").Router();
const db = require("../../db.cjs");

const getLocations = async (req, res) => {
  try {
    const getLocations = await db.collection("locations").get();

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
  const { location, environment } = req.body;
  //console.log(location);
  if (!location || !environment) {
    return res.status(400).json({ message: "location and environment are required" });
  } else if (location) {
    try {
      const addLocation = await db.collection("locations").add({ location, environment });

      if (addLocation) {
        return res.status(201).json({
          message: "location added!",
          status: "201 Created",
        });
      }
    } catch (error) {
      console.log("Error adding location:", error);
      return res.status(500).send(error);
    }
  }
};

router.get("/", getLocations);
router.post("/add", addLocation);

module.exports = router;
