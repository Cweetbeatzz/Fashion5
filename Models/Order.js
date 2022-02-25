const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    amount: { type: Number, required: true },
    status: { type: String, default: "pending" },
    qty: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", OrdersSchema);
