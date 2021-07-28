const express = require("express");
const userRoutes = express.Router();
const userController = require("../controllers/userController");
const authToken = require("../middleware/authToken");



// userRoutes.post("/authenticate", userController.authenticate);

// userRoutes.post("/users", userController.createUser);

// userRoutes.get("/myProfile", authToken, userController.getUser);

// userRoutes.patch("/myProfile", authToken, userController.updateUser)

// userRoutes.delete("/users/:id", authToken, userController.deleteUser);

module.exports = userRoutes;