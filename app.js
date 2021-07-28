const express = require("express");
require("dotenv").config();
const cors = require("cors");
// import routes here
const userRoutes = require("./routes/userRoutes")
//const errorHandler = require("./middleware/errorHandler");
const Logger = require("./middleware/logger");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());



app.use(Logger);

app.use("/api/v1", userRoutes ); // add Question routes here

//app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
