const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema(
  {
    RoleName: {
      type: String,
      required: [true, "Role Name is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", RoleSchema);
