const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [30, "Name cannot exceed 30 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price of product is required"],
      default: 0.0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category Selection for this product is required"],
    },
    company: {
      type: String,
      required: [true, "Business/Company Name is required"],
    },
    productImage: {
      type: String,
      required: [true, "Product Image is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [150, "Description cannot exceed 150 characters"],
    },
    in_stock: { type: Boolean, default: true },
    countInstock: { type: Number, default: 1 },
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", ProductSchema);
