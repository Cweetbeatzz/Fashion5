const { verifyToken } = require("../Services/Jwt");

//#######################################################

const checkUser = (req, res, next) => {
  const token = req.cookie.Fashion5User;

  if (token) {
    const decoded = verifyToken(token);
    const { email } = decoded;
  }
};

//#######################################################

module.exports = { checkUser };
