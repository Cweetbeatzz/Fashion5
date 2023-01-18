const { verifyToken } = require("../Services/Jwt");

//###########################################

const ensureLogginIn = (req, res, next) => {
  const authorization = req.headers.authorization;
  try {
    // JWT
    //must be logged in before access
    if (!authorization || authorization.startsWith("Bearer")) {
      res
        .status(401)
        .send({ message: "Error", data: "invalid credentials..." });
    }

    const token = authorization.split("")[1];
    const decoded = verifyToken(token);
    const { email } = decoded;
    req.user = email;
    next();
  } catch (error) {
    res.status(401).send({ message: "Error", data: "Not Authorized..." });
  }
};

//###########################################
const ensureLoginWithPermissions = (permissions) => {
  return (req, res, next) => {
    const authorization = req.headers.authorization;
    const userRole = req.body.role2;

    try {
      // JWT
      //must be logged in before access
      if (!authorization || authorization.startsWith("Bearer")) {
        res
          .status(401)
          .send({ message: "Error", data: "invalid credentials..." });
      }

      const token = authorization.split("")[1];
      const decoded = verifyToken(token);
      const { email } = decoded;
      req.user = email;

      if (permissions.includes(userRole)) {
        next();
      }
    } catch (error) {
      res.status(401).send({ message: "Error", data: "Not Authorized..." });
    }
  };
};

//###########################################

module.exports = { ensureLogginIn };
