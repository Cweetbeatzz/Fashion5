const { roles } = require("../utils/constants");

//#######################################################

const ensureCeo = (req, res, next) => {
  if (req.User.role2 === roles.ceo) {
    next();
  } else {
    res.send("Unauthorized Access");
  }
};

//#######################################################

module.exports = { ensureCeo };
