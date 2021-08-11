const { Forbidden } = require("../errors/index");

const authRoles = (rolesArr) => {
  return (req, res, next) => {
    if (!rolesArr.includes(req.user.role)) {
      throw new Forbidden();
    }
    next();
  };
};

module.exports = authRoles;
