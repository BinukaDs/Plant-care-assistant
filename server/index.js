const express = require("express");
const cors = require("cors");

require("dotenv").config();

const router = express();
router.use(cors({ origin: true }));
router.use(express.json());

const getDevices = async () => {
  const response = await router.get(`http:localhost:3000/devices`, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  setDevices(response.data.devices);
  setLoading(false);
};

router.use("/users", require("./routes/users.js"));
router.use("/signin", require("./routes/Authentication/signin.js"));
router.use("/register", require("./routes/Authentication/register.js"));
router.use("/isUserAuth", require("./routes/Authentication/isUserAuth.js"));
router.use("/addplant", require("./routes/Plants/addPlant.js"));
router.use("/getplants", require("./routes/Plants/getPlants.js"))
router.use("/getDetails", require("./routes/Gemini/gemini.js"))
router.get("/", (req, res) => {
  res.send("Hello World");
});

router.listen(3001, () => {
  console.log(`App is listening to port: ${3001}`);
});
