const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Category Name is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
