const express = require("express");
const cartRouter = express.Router();
const ProductsModel = require("../Models/Products");

//
cartRouter.get("/getAllCart", async (req, res) => {});
//
cartRouter.get("/getCartById/:id", async (req, res) => {});

//
cartRouter.post("/createCart", async (req, res) => {
  const product = new ProductsModel(req.body);

  try {
    const savedproduct = await product.save();
    res.status(201).json(savedproduct);
  } catch (error) {
    res.status(404).json(error);
  }
});

//
cartRouter.patch("/updateCartById/:id", async (req, res) => {});

//
cartRouter.delete("/deleteCartById/:id", async (req, res) => {});

module.exports = cartRouter;
