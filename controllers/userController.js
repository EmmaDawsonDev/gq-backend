const { Users, Questions } = require("../database/connection");
const client = require("../database/connection");
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
      role: "user",
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

    const jwtPayload = { email: user.email, _id: user._id, role: user.role };
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

const deleteUser = async (req, res, next) => {
  try {
    const _id = req.user._id;
    const session = client.startSession();

    try {
      await session.withTransaction(async () => {
        const userColl = Users;
        const questionsColl = Questions;
        await userColl.deleteOne({ _id: ObjectId(_id) }, { session });

        await questionsColl.updateMany(
          {},
          { $pull: { "properties.answeredBy": _id } },
          { session }
        );
      });
    } finally {
      await session.endSession();
      res.status(200).json({ message: `User with id ${_id} deleted` });
    }
    //Here we need to look at transactions so that all userId refs can be deleted from questions at the same time as the user is deleted.
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  authenticate,
  updateUser,
  deleteUser,
};
