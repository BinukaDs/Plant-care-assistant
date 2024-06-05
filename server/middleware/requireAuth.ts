import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import db from "../db.cjs";

// requireAuth middleware is applied to all routes except /login and /register
// to prevent unauthenticated users from accessing protected routes
const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
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
    const decodedToken = jwt.verify(
      token,
      "secret123" as Secret
    ) as JwtPayload;
    const { _id } = decodedToken;
    req.user = await db
        .collection("users")
        .where("_id", "==", _id)
        .get();

    console.log("user is authenticated");
    next();
  } catch (error) {
    console.log("Error while authenticating : ", error);
    return res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;