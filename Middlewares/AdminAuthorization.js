const { roles } = require("../utils/constants");

//#######################################################

const ensureAdmin = (req, res, next) => {
  if (req.User.role2 === roles.admin) {
    next();
  } else {
    res.send("Unauthorized Access");
  }
};

//#######################################################

module.exports = { ensureAdmin };
