const { Users } = require("../database/connection");

const createUser = async (req, res, next) => {
  try {
    console.log("here");
    const newUser = await Users.insertOne({
      name: "test4",
      email: "test4@test.com",
    });
    console.log("success", newUser);
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
