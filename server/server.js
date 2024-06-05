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

const getDevices = async () => {
  const response = await router.get(`http:localhost:3000/devices`, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  setDevices(response.data.devices);
  setLoading(false);
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

      if (login.empty) {
        console.log("empty");
        res.status(400).json({
          message: "User not found",
          status: "400 Bad Request",
        });
        return;
      }
      if (!login.empty) {
        const validPassword = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!validPassword) {
          res.status(400).json({
            message: "Invalid password",
            status: "400 Bad Request",
          });
          return;
        }

        const token = createToken(user._id);
        if (validPassword) {
          console.log("User Logged in: ", user);
          res.status(200).json({
            name: user.name,
            email: user.email,
            token: token,
            message: "User logged in",
          });
          
        }
        return;
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
        token: token,
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
