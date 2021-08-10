const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authToken = require("../middleware/authToken");
const {
  userCreateValidationRules,
  userLoginValidationRules,
  validate,
  userUpdateValidationRules,
} = require("../middleware/validateUserInput");

router.post(
  "/authenticate",
  userLoginValidationRules(),
  validate,
  userController.authenticate
);

router.post(
  "/users",
  userCreateValidationRules(),
  validate,
  userController.createUser
);

// router.get("/myProfile", authToken, userController.getUser);

router.patch(
  "/myProfile",
  userUpdateValidationRules(),
  validate,
  authToken,
  userController.updateUser
);

// router.delete("/users/:id", authToken, userController.deleteUser);

module.exports = router;
