const { Users } = require("../database/connection");
const bcrypt = require("bcryptjs");

const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const hashedPwd = bcrypt.hashSync(password, 12);

    const newUser = {
      username,
      email,
      password: hashedPwd,
      score: 0,
    };
    const response = await Users.insertOne({
      ...newUser,
    });

    res.status(201).json({
      success: response.acknowledged,
      message: `User with id ${response.insertedId} successfully created`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
};
