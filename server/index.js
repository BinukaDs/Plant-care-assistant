const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const getDevices = async () => {
  const response = await app.get(`http:localhost:3000/devices`, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  setDevices(response.data.devices);
  setLoading(false);
};

app.use("/users", require("./routes/users.js"));
app.use("/signin", require("./routes/Authentication/signin.js"));
app.use("/register", require("./routes/Authentication/register.js"));
app.use("/isUserAuth", require("./routes/Authentication/isUserAuth.js"));
app.use("/plants", require("./routes/Plants/Plants.js"));
app.use("/growthlogs", require("./routes/Plants/growthLogs.js"));

app.listen(3001, () => {
  console.log(`App is listening to port: ${3001}`);
});
