const mongoose = require("mongoose");

const GroupMessagesSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GroupMessages", GroupMessagesSchema);
