const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const extractToken = (req) => {
  const authHeader = req.headers["x-access-token"];
  return authHeader ? authHeader.split(" ")[1] : null;
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

const verifyJWT = async (req, res, next) => {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({ message: "No Token Provided!", isLoggedin: false });
    }

    try {
      const decoded = await verifyToken(token);
      req.user = { id: decoded.id, username: decoded.username };
      next();
    } catch (err) {
      console.error("Failed to authenticate", err);
      res.status(401).json({ auth: false, message: "You failed to authenticate" });
    }
  } catch (error) {
    console.error("Verify Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

router.get("/", verifyJWT, (req, res) => {
  res.json({ isLoggedin: true, id: req.user.id });
});

router.get("/userdata", verifyJWT, (req, res) => {
  res.json({ username: req.user.username, id: req.user.id });
});

module.exports = router;