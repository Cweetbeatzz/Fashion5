const { roles } = require("../utils/constants");

//#######################################################

const ensureManager = (req, res, next) => {
  if (req.User.role2 === roles.manager) {
    next();
  } else {
    res.send("Unauthorized Access");
  }
};

//#######################################################

module.exports = { ensureManager };
