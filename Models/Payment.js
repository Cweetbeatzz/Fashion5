const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
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
    productItemsTotalAmount: { type: Number, required: true },
    status: { type: String, default: "pending" },
    qty: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    tax: { type: Number, required: true },
    grandTotalPlusTax: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    paidDate: { type: Date },
    delivered: { type: Boolean, default: false },
    deliveredDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("payment", PaymentSchema);
