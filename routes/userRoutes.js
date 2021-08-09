const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authToken = require("../middleware/authToken");
const {
  userValidationRules,
  validate,
} = require("../middleware/validateUserInput");

// router.post("/authenticate", userController.authenticate);

router.post(
  "/users",
  userValidationRules(),
  validate,
  userController.createUser
);

// router.get("/myProfile", authToken, userController.getUser);

// router.patch("/myProfile", authToken, userController.updateUser)

// router.delete("/users/:id", authToken, userController.deleteUser);

module.exports = router;
