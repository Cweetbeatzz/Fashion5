const express = require("express");
const stripeRouter = express.Router();
require("dotenv").config();
const stripe = require("stripe");

//###################################################################
stripeRouter.post("/payment", async (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(404).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = stripeRouter;
