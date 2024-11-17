const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());


app.use("/api/users", require("./routes/Users/users.js"));
app.use(
  "/api/passwords/update",
  require("./routes/Authentication/password.js")
);
app.use("/api/signin", require("./routes/Authentication/signin.js"));
app.use("/api/register", require("./routes/Authentication/signup.js"));
app.use("/api/isUserAuth", require("./routes/Authentication/isUserAuth.js"));
app.use("/api/plants", require("./routes/Plants/Plants.js"));
app.use("/api/growthlogs", require("./routes/Plants/growthLogs.js"));
app.use("/api/locations", require("./routes/Plants/Locations.js"));
app.use("/api/gemini", require("./routes/Gemini/gemini.js"));
app.use("/api/species", require("./routes/Plants/SpeciesData.js"));
app.post("/api/hello", (req, res) => { 
  res.json({ message: "Hello World" });
});

app.listen(3001);
