const mongoose = require("mongoose");
const { roles } = require("../utils/constants");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Firstname is Required"],
      trim: true,
      maxlength: [50, "Firstname must not exceed 50 characters"],
    },
    lastname: {
      type: String,
      required: [true, "Lastname is Required"],
      trim: true,
      maxlength: [50, "Lastname must not exceed 50 characters"],
    },
    username: {
      type: String,
      required: [true, "Username is Required"],
      trim: true,
      maxlength: [50, "Username must not exceed 50 characters"],
      unique: [true, "Username is already taken"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      trim: true,
      maxlength: [250, "Email must not exceed 250 characters"],
      unique: [true, "Email is already taken"],
    },
    address: {
      type: String,
      required: [true, "Address is Required"],
      trim: true,
      maxlength: [450, "Address must not exceed 450 characters"],
    },
    phone: {
      type: Number,
      required: [true, "Phone is Required"],
      trim: true,
      maxlength: [13, "Phone must not exceed 13 numbers"],
    },
    country: {
      type: String,
      required: [true, "Country is Required"],
      trim: true,
      maxlength: [150, "Country must not exceed 150 characters"],
    },
    state: {
      type: String,
      required: [true, "State is Required"],
      trim: true,
      maxlength: [150, "State must not exceed 150 characters"],
    },
    postalcode: {
      type: Number,
      // required: [true, "PostCode is Required"],
      trim: true,
      maxlength: [15, "PostCode must not exceed 15 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    // profilePicture: {
    //   type: String,
    //   default: "",
    // },
    // coverPicture: {
    //   type: String,
    //   default: "",
    // },
    // followers: {
    //   type: Array,
    //   default: [],
    // },
    // followings: {
    //   type: Array,
    //   default: [],
    // },
    // userRoles: {
    //   type: Array,
    //   default: [roles.client],
    // },
    roles2: {
      type: String,
      enum: [
        roles.client,
        roles.admin,
        roles.ceo,
        roles.logistics,
        roles.manager,
      ],
      default: roles.client,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", UserSchema);
