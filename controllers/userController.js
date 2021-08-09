const { Users } = require("../database/connection");
const bcrypt = require(bcrypt);

const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await Users.insertOne({
      username,
      email,
      password,
    });
    console.log("success", newUser);
    // response from db:
    // "newUser": {
    //  "acknowledged": true,
    //  "insertedId": "610c39246e80e052062a4491"
    // }
    res.json({
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
};
