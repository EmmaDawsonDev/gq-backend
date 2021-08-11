const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const authToken = require("../middleware/authToken");
const {
  questionCreateValidationRules,
  validate,
} = require("../middleware/validateUserInput");

router.post(
  "/questions",
  questionCreateValidationRules(),
  validate,
  questionController.createQuestion
);

module.exports = router;
