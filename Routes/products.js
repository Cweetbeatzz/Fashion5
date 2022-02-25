const express = require("express");
const productsRouter = express.Router();

const {
  getAllProducts,
  createProducts,
  getProductsById,
  updateProductsById,
  deleteProductsById,
} = require("../Controllers/ProductsController");

productsRouter.route("/").get(getAllProducts);
productsRouter.route("/").post(createProducts);
productsRouter.route("/:id").get(getProductsById);
productsRouter.route("/:id").patch(updateProductsById);
productsRouter.route("/:id").delete(deleteProductsById);

module.exports = productsRouter;
