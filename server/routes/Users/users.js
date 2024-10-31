const db = require("../../db.cjs");
const dotenv = require("dotenv");
dotenv.config();
var router = require("express").Router();

const getUser = async (req, res) => {
  const { UserId } = req.body;

  if (!UserId) {
    return res.status(400).json({
      message: "UserId is required",
      status: 400,
    });
  } else if (UserId) {
    try {
      await db
        .collection("users")
        .doc(UserId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            return res.status(200).json({
              message: "User found",
              status: 200,
              user: {
                email: doc.data().email,
                username: doc.data().username,
              },
            });
          } else {
            return res.status(404).json({
              message: "User not found",
              status: 404,
            });
          }
        });
    } catch (error) {
      console.log("Error getting user: ", error);
      return res.status(500).json({
        message: "Error getting user",
        status: 500,
      });
    }
  }
};

const updateUser = async (req, res) => {
  const { UserId, username } = req.body;
  console.log(UserId, username, "update user");
  if (!UserId) {
    return res.status(400).json({
      message: "UserId is required",
      status: 400,
    });
  } else if (UserId) {
    if (!username) {
      return res.status(400).json({
        message: "Username is required",
        status: 400,
      });
    } else if (username) {
      try {
        await db
          .collection("users")
          .doc(UserId)
          .update({
            username: username,
          })
          .then(() => {
            return res.status(200).json({
              message: "User updated",
              status: 200,
            });
          });
      } catch (error) {
        console.log("Error updating user: ", error);
        return res.status(500).json({
          message: "Error updating user",
          status: 500,
        });
      }
    }
  }
};
const getUsers = async (req, res) => {
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
};

router.get("/", getUsers);
router.post("/user", getUser);
router.patch("/update", updateUser);
module.exports = router;
