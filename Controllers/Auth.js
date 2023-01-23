const express = require("express");
const Users = require("../Models/Users");
require("dotenv").config();
const { comparePasswords } = require("../Services/passwordHash");
const { generateToken } = require("../Services/Jwt");
const authRouter = express.Router();

//#############################################################
//
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // if (!email || !password) {
    //   res.status(400).send({
    //     message: "Error",
    //     data: "Please provide your email & password",
    //   });
    // }

    //search fr email
    const searchUserEmail = await Users.findOne({ email: email });
    // console.log("logged ", searchUserEmail);
    const generatedToken = generateToken(searchUserEmail);

    // compare passwords
    if (searchUserEmail) {
      //if password correct
      if (comparePasswords(req.body.password, searchUserEmail.password)) {
        //set cookie
        res.cookie("AccessToken", generatedToken, {
          maxAge: 259200000, //3 days converted to millisecound
          httpOnly: true,
        });
        //send these details plus the generated token
        res.status(200).send({
          message: "Success",
          user: {
            id: searchUserEmail._id,
            username: searchUserEmail.username,
            email: searchUserEmail.email,
            roles2: searchUserEmail.roles2,
            token: generatedToken,
          },
        });

        return;
      }
    }
    res.status(401).send({ error: "Invalid Credientials...Please try again" });
  } catch (error) {
    res.status(500).send({ message: "Error", data: "Internal Server Error" });
  }
});

//#############################################################

authRouter.post("/logout", (req, res) => {
  res.cookie("Fashion5User", "", { maxAge: 1 });
});

//#############################################################

module.exports = authRouter;
