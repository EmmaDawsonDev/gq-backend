const { Unauthorized, TokenExpired } = require("../errors/index");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Unauthorized();
  }
  const token = authorization.replace("Bearer ", "");

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
    return user;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new TokenExpired();
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Unauthorized();
    } else {
      throw error;
    }
  }
};

module.exports = authToken;
