const { roles } = require("../utils/constants");
const { verifyToken } = require("../Services/Jwt");

//#######################################################

const ensureAdmin = (req, res, next) => {
  const authorization = req.headers.authorization;

  try {
    //must be logged in before access
    if (!authorization || !authorization.startsWith("Bearer")) {
      res.status(401).send({ message: "Error", data: "Please Login..." });
    }
    
    const token = authorization.split("")[1];
    const decoded = verifyToken(token);
    const { id, username, email, roles2 } = decoded;

    if (roles2 === roles.admin) {
      next();
    }
  } catch (error) {
    res
      .status(401)
      .send({ message: "Error", data: "Not Authorized...Admin Access only" });
  }
};

//#######################################################

module.exports = { ensureAdmin };
