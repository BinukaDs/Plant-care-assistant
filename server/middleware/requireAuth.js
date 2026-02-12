const jwt = require("jsonwebtoken");
const db = require("../db.cjs");
require("dotenv").config();

// requireAuth middleware is applied to all routes except /login and /register
// to prevent unauthenticated users from accessing protected routes
const requireAuth = async (req, res, next) => {
  if (req.path === "/login" || req.path === "/register") {
    return next();
  }
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    // verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decodedToken;
    req.user = await db.collection("users").doc(id).get();

    // console.log("user is authenticated");
    next();
  } catch (error) {
    console.log("Error while authenticating : ", error);
    return res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
