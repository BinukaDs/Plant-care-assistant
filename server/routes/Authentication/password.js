const db = require("../../db.cjs");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();
var router = require("express").Router();

const updatePassword = async (req, res) => {
  const { UserId, password } = req.body;
console.log("UserId: ", UserId, password);
  if (!UserId || !password) {
    return res.status(400).json({
      message: "UserId and password are required",
      status: 400,
    });
  } else if (UserId && password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await db.collection("users").doc(UserId).update({
        hashedPassword,
      });
      return res.status(200).json({
        message: "Password updated",
        status: 200,
      });
    } catch (error) {
      console.log("Error updating password: ", error);
      return res.status(500).json({
        message: "Error updating password",
        status: 500,
      });
    }
  }
};

router.patch("/", updatePassword);

module.exports = router;
