const express = require("express");
require("dotenv").config();
const cors = require("cors");

const client = require("./database/connection");

const userRoutes = require("./routes/userRoutes");
//const questionRoutes = require("./routes/questionRoutes");
const errorHandler = require("./middleware/errorHandler");
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

app.use(errorHandler);

client.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Successfully connected to db");

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  }
});
