const { Users } = require("../database/connection");
const bcrypt = require("bcryptjs");
const { MissingCredentials, UnprocessableEntity } = require("../errors/index");

const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const hashedPwd = bcrypt.hashSync(password, 12);

    // if (!email || !password || !username) {
    //   throw new MissingCredentials(["email", "password", "name"]);
    // }
    const newUser = {
      username,
      email,
      password: hashedPwd,
      score: 0,
    };
    const response = await Users.insertOne({
      ...newUser,
    });

    console.log("success", response);
    // response from db:
    // "newUser": {
    //  "acknowledged": true,
    //  "insertedId": "610c39246e80e052062a4491"
    // }
    res.status(201).json({
      response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
};
