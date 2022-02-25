const express = require("express");

const userRouter = express.Router();

const {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsersById,
  deleteUsersById,
} = require("../Controllers/UsersController");

userRouter.route("/");
userRouter.route("/").get(getAllUsers);
userRouter.route("/").post(createUsers);
userRouter.route("/:id").get(getUsersById);
userRouter.route("/:id").patch(updateUsersById);
userRouter.route("/:id").delete(deleteUsersById);

module.exports = userRouter;
