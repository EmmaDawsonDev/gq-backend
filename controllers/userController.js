const { Users } = require("../database/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { InvalidCredentials, Unauthorized } = require("../errors/index");
const { ObjectId } = require("mongodb");

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

const authenticate = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });

    if (!user) {
      throw new Unauthorized();
    }

    const valid = bcrypt.compareSync(password, user.password);

    if (!valid) {
      throw new InvalidCredentials();
    }

    const jwtPayload = { email: user.email, _id: user._id };
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET);

    const userPayload = {
      _id: user._id,
      username: user.username,
      email: user.email,
      points: user.points,
      token,
    };

    res.status(200).json(userPayload);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const { _id } = req.user;
    const updateObj = {};
    if (username) {
      updateObj.username = username;
    }
    if (email) {
      updateObj.email = email;
    }
    if (password) {
      updateObj.password = bcrypt.hashSync(password, 12);
    }
    const response = await Users.updateOne(
      { _id: ObjectId(_id) },
      { $set: updateObj }
    );

    res
      .status(200)
      .json({ message: `Updated ${response.modifiedCount} user(s)` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  authenticate,
  updateUser,
};
