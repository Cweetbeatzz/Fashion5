const express = require("express");
const Users = require("../Models/Users");
require("dotenv").config();
const { comparePasswords } = require("../Services/passwordHash");
const { generateToken } = require("../Services/Jwt");
const authRouter = express.Router();

//#############################################################
//
authRouter.post("/login", async (req, res) => {
  //search fr email
  const searchUserEmail = await Users.findOne({ email: req.body.email });
  const generatedToken = generateToken(searchUserEmail);

  // compare passwords
  if (searchUserEmail) {
    //if password correct
    if (comparePasswords(req.body.password, searchUserEmail.password)) {
      //send these details plus the generated token
      res.status(200).send({
        id: searchUserEmail._id,
        username: searchUserEmail.username,
        email: searchUserEmail.email,
        token: generatedToken,
      });
      //set cookie
      res.cookie("Fashion5User", generatedToken, {
        maxAge: 259200000, //3 days converted to millisecound
        httpOnly: true,
      });
      return;
    }
  }
  res.status(401).send({ error: "Unauthorized access" });
});

//#############################################################

authRouter.post("/logout", (req, res) => {
  res.cookie("Fashion5User", "", { maxAge: 1 });
});

//#############################################################

module.exports = authRouter;
