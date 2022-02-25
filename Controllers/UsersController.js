const Users = require("../Models/Users");
const express = require("express");
const userRouter = express.Router();
const { hashPassword } = require("../Services/passwordHash");
const { generateToken } = require("../Services/Jwt");

//#######################################################

userRouter.get("/getAllUsers", async (req, res) => {
  const allusers = await Users.find({});
  res.status(200).json({
    firstname: allusers.firstname,
    lastname: allusers.lastname,
    username: allusers.username,
    email: allusers.email,
    address: allusers.address,
    phone: allusers.phone,
    country: allusers.country,
    state: allusers.state,
    postalcode: allusers.postalcode,
  });
});

//#######################################################

userRouter.get("/getUsersById/:id", async (req, res) => {
  //
  const users = await Users.findById(req.params.id);

  if (!users) {
    res.status(404).send({ message: `No task matching the following ID` });
  }
  res.status(200).send({
    firstname: users.firstname,
    lastname: users.lastname,
    username: users.username,
    email: users.email,
    address: users.address,
    phone: users.phone,
    country: users.country,
    state: users.state,
    postalcode: users.postalcode,
  });
});

//#######################################################

userRouter.post("/createUsers", async (req, res) => {
  const hashedpass = hashPassword(req.body.password);

  const newUser = new Users({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    country: req.body.country,
    state: req.body.state,
    postalcode: req.body.postalcode,
    password: hashedpass,
  });

  try {
    const created = await newUser.save();
    res.status(201).json({
      id: created._id,
      username: created.username,
      email: created.email,
      isAdmin: created.isAdmin,
      isClient: created.isClient,
      isSeller: created.isSeller,
      isTransit: created.isTransit,
      // token: generateToken(created),
    });
  } catch (error) {
    res.status(404).send(error);
  }
});

//#######################################################

userRouter.put("/updateUsersById/:id", async (req, res) => {
  const hashedpass = hashPassword(req.body.password);
  let oldUserDetails = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    country: req.body.country,
    state: req.body.state,
    postalcode: req.body.postalcode,
    password: hashedpass,
  };
  //
  const updatedUser = await Users.findByIdAndUpdate(req.params.id, {
    $set: oldUserDetails,
  });

  if (!updatedUser) {
    res.status(404).send({ message: `No task matching the following ID` });
  }
  res.status(200).send([
    { message: "Update Successful" },
    {
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      username: updatedUser.username,
      email: updatedUser.email,
      address: updatedUser.address,
      phone: updatedUser.phone,
      country: updatedUser.country,
      state: updatedUser.state,
      postalcode: updatedUser.postalcode,
    },
  ]);
});

//#######################################################

userRouter.delete("/deleteUsersById/:id", async (req, res) => {
  //
  const userById = await Users.findByIdAndDelete(req.params.id);

  if (!userById) {
    res.status(404).send({ message: `No task matching the following ID` });
  }
  res.status(200).send([{ message: `Delete Successfull` }, {}]);
});

//#######################################################

userRouter.get("/search", async (req, res) => {});

//#######################################################

module.exports = userRouter;
