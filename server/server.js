import express from "express";
import cors from "cors";
import db from "./db.cjs";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express();
router.use(cors({ origin: true }));
router.use(express.json());

// create token with user id
const createToken = (_id) => {
  // expiresIn is set to 1 day
  // JWT_SECRET is a secret string that is used to sign the token
  return jwt.sign({ _id }, "secret123", { expiresIn: "1d" });
};

router.get("/users", async (req, res) => {
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

router.post("/signin", async (req, res) => {
  console.log("signin hit!");
  try {
    const { email, password } = req.body;
    console.log(password);
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    try {
      const login = await db
        .collection("users")
        .where("email", "==", email)
        .get();


        const user = login.docs[0].data();
        console.log("login: ", user)
      if (!login.empty) {
        const validPassword = await bcrypt.compare(password, user.hashedPassword);
        console.log("hashedPassword: ", user);

        if (!validPassword) {
          res.status(400).json({
            message: "Invalid password",
            status: "400 Bad Request",
          });
          return;
        }

        const token = createToken(user._id);

        res.status(200).json({
          name: login.name,
          email: login.email,
          token: token,
        });
        return;
      }

      if (login.size > 0) {
        console.log("User found");
        res.json(login.docs[0].data());
      } else {
        console.log("User not found");
        return res.status(400).send("User not found");
      }
    } catch (error) {
      console.log("error in logging user: ", error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/register", async (req, res) => {
  console.log("register hit!");
  try {
    const { email, password, name } = req.body;
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
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.listen(3001, () => {
  console.log(`App is listening to port: ${3001}`);
});
