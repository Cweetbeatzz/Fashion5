const { roles } = require("../utils/constants");
const { verifyToken } = require("../Services/Jwt");

//#######################################################

const ensureManager = (req, res, next) => {
  const authorization = req.headers.authorization;

  try {
    const token = authorization.split("")[1];
    const decoded = verifyToken(token);
    const { role2 } = decoded;

    if (role2 === roles.manager) {
      next();
    }
  } catch (error) {
    res
      .status(401)
      .send({ message: "Error", data: "Not Authorized...Manager Access only" });
  }
};

//#######################################################

module.exports = { ensureManager };
