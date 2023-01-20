const { roles } = require("../utils/constants");

//#######################################################

const ensureAdmin = (req, res, next) => {
  if (req.User.role2 === roles.admin) {
    next();
  } else {
    res
      .status(401)
      .send({ message: "Error", data: "Not Authorized...Admin Access only" });
  }
};

//#######################################################

module.exports = { ensureAdmin };
