const db = require("../db.cjs");
const dotenv = require("dotenv");
dotenv.config();
var router = require('express').Router();


router.get("/", async (req, res) => {
  try {
    const users = [];
    const snapshot = await db.collection("users").get();
    snapshot.forEach((doc) => {
      users.push(doc.data());
    });
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});





module.exports = router;
