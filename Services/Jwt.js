const jwt = require("jsonwebtoken");
require("dotenv").config();

//#####################################################

const generateToken = (user) => {
  //time the json it expires (30 Days)
  let maxAge = 30 * 24 * 60 * 60;

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      roles2: user.roles2,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: maxAge }
  );
  return token;
};

//#####################################################

const verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return decoded;
};
//#####################################################

module.exports = { generateToken, verifyToken };
