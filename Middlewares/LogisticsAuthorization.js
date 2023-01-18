const { roles } = require("../utils/constants");

//#######################################################

const ensureLogistics = (req, res, next) => {
  if (req.User.role2 === roles.logistics) {
    next();
  } else {
    res.send("Unauthorized Access");
  }
};

//#######################################################

module.exports = { ensureLogistics };
