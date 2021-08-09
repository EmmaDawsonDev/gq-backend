const { CustomError } = require("../errors");
//const { BaseError } = require("sequelize"); // Find out what this is for mongodb

const HandleError = (error, req, res, next) => {
  if (error instanceof CustomError) {
    res.status(error.errorCode).json({ error: error.errorMessage });
    // } else if (error instanceof BaseError) {
    //   res.status(400).json({
    //     error: error.message,
    //   });
    //
  } else if (error.code === 11000) {
    res.status(422).json({ message: "Email already exists" });
  } else {
    res
      .status(500)
      .json({ error: error.code, message: "Something went wrong" });
  }
};

module.exports = HandleError;
