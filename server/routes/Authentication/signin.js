const db = require("../../db.cjs");
const dotenv = require("dotenv");
dotenv.config();
var router = require("express").Router();
const AuthenticationErrors = require("../../responseCodes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({
        messsage: "Please fill in all fiedls!",
        status: 400
      });
  } else if (typeof email !== "string" || typeof password !== "string") {
    return res
      .status(400)
      .json({
        messsage: "Email and password must be in correct types!",
        status: 400
      });
  }

  const login = await db.collection("users").where("email", "==", email).get();

  if (login.empty) {
    console.error("Error 404: User not found.");
    return res.status(404).json({
      message: "User not found!",
      status: 404,
    });
  }
  if (!login.empty) {
    const user = login.docs[0].data();
    const isValidPassword = await bcrypt.compare(password, user.hashedPassword);

    if (!isValidPassword) {
      console.log("Error 401: Invalid password.");
      return res.status(401).json({
        message: "Invalid password!",
        status: 401,
      });
    }

    if (isValidPassword) {
      const payload = {
        id: login.docs[0].id,
        username: user.name,
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) return res.status(500).send(err);
          return res.status(200).json({
            message: "User logged in",
            status: 200,
            token: "Bearer " + token,
          });
        }
      );
      console.log("Success");
    }
  }
};

router.post("/", signIn);
module.exports = router;
