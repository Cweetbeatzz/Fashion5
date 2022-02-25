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

  // compare passwords
  if (searchUserEmail) {
    //if password correct
    if (comparePasswords(req.body.password, searchUserEmail.password)) {
      //send these details plus the generated token
      res.status(200).send({
        id: searchUserEmail._id,
        username: searchUserEmail.username,
        email: searchUserEmail.email,
        isAdmin: searchUserEmail.isAdmin,
        isClient: searchUserEmail.isClient,
        isSeller: searchUserEmail.isSeller,
        isTransit: searchUserEmail.isTransit,
        token: generateToken(searchUserEmail),
      });
      return;
    }
  }
  res.status(401).send({ error: "Unauthorized access" });
});

//#############################################################

authRouter.post("/logout", (req, res) => {});

//#############################################################

module.exports = authRouter;
