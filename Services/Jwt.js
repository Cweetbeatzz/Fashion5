const jwt = require("jsonwebtoken");
require("dotenv").config();

//#####################################################

const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      isClient: user.isClient,
      isSeller: user.isSeller,
      isTransit: user.isTransit,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
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
