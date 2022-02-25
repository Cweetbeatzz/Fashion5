const bcrypt = require("bcryptjs");

//hash & salted password
const hashPassword = (_password) => {
  const output = bcrypt.hashSync(_password, 8);
  return output;
};

const comparePasswords = (plainPassword, hashedPassword) => {
  const output = bcrypt.compareSync(plainPassword, hashedPassword);
  return output;
};

module.exports = { hashPassword, comparePasswords };
