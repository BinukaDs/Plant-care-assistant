const db = require("../../db.cjs");
const dotenv = require("dotenv");
dotenv.config();
var router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    try {
      const login = await db
        .collection("users")
        .where("email", "==", email)
        .get();

      const user = login.docs[0].data();

      if (login.empty) {
        res.status(404).json({
          message: "User not found",
          status: "404 Bad Request",
        });
        return;
      }
      if (!login.empty) {
        const isValidPassword = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!isValidPassword) {
          return res.status(400).json({
            message: "Invalid password",
            status: "400 Bad Request",
          });
        }

        if (isValidPassword) {
          const payload = {
            id: login.docs[0].id,
            username: user.name,
          };
          jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: "1d"}, (err, token) => {
            if (err) return res.status(500).send(err);
            return res.status(200).json({
              message: "User logged in",
              token: "Bearer " + token,
              
            });
          });
          console.log("Success");
          
        }
      }
    } catch (error) {
      console.log("error in logging user: ", error);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
