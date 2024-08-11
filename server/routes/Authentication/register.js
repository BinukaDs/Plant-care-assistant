const db = require("../../db.cjs");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const validator = require("validator");
const AuthenticationErrors = require("../../responseCodes");

const createToken = (_id) => {
  // expiresIn is set to 1 day
  // JWT_SECRET is a secret string that is used to sign the token
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

router.post("/", async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    console.log("Name, Email and Password are required");
    return res.status(400).send("Name, Email and Password are required");
  }
  const checkAvailability = await db
    .collection("users")
    .where("email", "==", email)
    .get();
  if (checkAvailability.size > 0) {
    console.log("Email already in use");
    return res
      .status(400)
      .json({
        message: "Email already in use.",
        status: 400,
      });
  } else if (checkAvailability.size === 0) {
    if (!validator.isEmail(email)) {
      console.log("Email is not valid");
      return res
        .status(400)
        .json({
          message: "Email is not valid!",
          status: 400,         
        });
    }

    if (!validator.isStrongPassword(password)) {
      console.log("Password is not strong enough");
      return res
        .status(400)
        .json({
          message: "Password is not strong enough!",
          status: 400,
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await db.collection("users").add({
      username,
      email,
      hashedPassword,
    });
    const token = createToken(newUser._id);
    res.status(201).json({
      status: 201,
      name: newUser.name,
      email: newUser.email,
      token: token,
    });
  }
});

module.exports = router;
