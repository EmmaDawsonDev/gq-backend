const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const authToken = require("../middleware/authToken");
const authRoles = require("../middleware/authRole");
const {
  questionCreateValidationRules,
  validate,
} = require("../middleware/validateUserInput");

router.post(
  "/questions",
  questionCreateValidationRules(),
  validate,
  authToken,
  authRoles(["admin"]),
  questionController.createQuestion
);

router.patch("/questions/:id", authToken, questionController.checkAnswer);

module.exports = router;
