const dotenv = require("dotenv");
dotenv.config();
var router = require("express").Router();
const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  try {
    const token = req.headers["x-access-token"]?.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.json({ auth: false, message: "You failed to authenticate" });
          console.log("Failed to authenticate", err);
        } else {
          req.user = {}
          req.user.id = decoded.id
          req.user.username = decoded.username
          //console.log("username: ", decoded.id)
          next();
        }
      });
    } else {
      res.json({ message: "Incorrect Token given!", isLoggedin: false });
      //console.log("Incorrect token");
    }
  } catch (error) {
    console.log("error: " + error);
  }
}
router.get("/", verifyJWT, (req, res) => {
  // console.log("verify hit");
  return res.json({ isLoggedin: true, id: req.user.id });
});

router.get("/userdata", verifyJWT, (req, res) => {
  return res.json({username: req.user.username, id: req.user.id})
})

module.exports = router;
