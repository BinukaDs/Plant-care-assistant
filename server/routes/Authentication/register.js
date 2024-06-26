const db = require('../../db.cjs')
const dotenv = require("dotenv");
dotenv.config();
var router = require('express').Router();

router.post("/", async (req, res) => {
    console.log("register hit!");
    try {
      const { email, password, name } = req.body;
      if (!email || !password || !name) {
        return res.status(400).send("Name, Email and Password are required");
      }
      const checkAvailability = await db
        .collection("users")
        .where("email", "==", email)
        .get();
      if (checkAvailability.size > 0) {
        console.log("Email already in use");
        return res.status(400).send("Email already in use");
      } else if (checkAvailability.size === 0) {
        if (!validator.isEmail(email)) {
          console.log("Email is not valid");
          return res.status(400).send("Email is not valid!");
        }
  
        // if (!validator.isStrongPassword(password)) {
        //   console.log("Password is not strong enough");
        //   return res.status(400).send("Password is not strong enough!");
        // }
  
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await db.collection("users").add({
          name,
          email,
          hashedPassword,
        });
        const newentry = await newUser.save();
        const token = createToken(newentry._id);
        
        res.status(201).json({
          name: newentry.name,
          email: newentry.email,
          token: token,
        });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
module.exports = router
