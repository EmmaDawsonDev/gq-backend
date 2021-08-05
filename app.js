const express = require("express");
require("dotenv").config();
const cors = require("cors");

const client = require("./database/connection");

const userRoutes = require("./routes/userRoutes");
//const questionRoutes = require("./routes/questionRoutes");
//const errorHandler = require("./middleware/errorHandler");
const logger = require("./middleware/logger");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(logger);

app.use(
  "/api/v1",
  userRoutes //questionRoutes
); // add Question routes here

//app.use(errorHandler);

client.connect((err) => {
  const usersCollection = client.db("geoQuizzr").collection("Users");
  const questionsCollection = client.db("geoQuizzr").collection("Questions");
  console.log("Successfully connected to db");
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
  // perform actions on the collection object
  client.close();
});
