const ProductsModel = require("../Models/Products");
const express = require("express");
const productsRouter = express.Router();
const { uploadLocation } = require("../Services/imageUploads");

//#######################################################

productsRouter.get("/getAllProducts", async (req, res) => {
  const products = await ProductsModel.find({});
  res.status(200).send(products);
});

//
//#######################################################

productsRouter.get("/getAllProductsByCategory/:category", async (req, res) => {
  const qcategory = req.query.category;
  let products;

  products = await ProductsModel.find({ categories: { $in: [qcategory] } })
    .sort({ createdAt: -1 })
    .limit(30);

  res.status(200).send({ products });
});

//#######################################################

//search by company, product name
productsRouter.get("/getAllProductsBySearch/:search", async (req, res) => {
  const { productName, company } = req.query;
  const queryRequest = {};

  if (productName) {
    queryRequest.productName = { $regex: productName };
  }
  if (company) {
    queryRequest.company = { $regex: company };
  }

  let products;

  products = await ProductsModel.find(queryRequest)
    .sort({ createdAt: -1 })
    .limit(30);

  res.status(200).send({ products });
});

//#######################################################

productsRouter.get("/getProductsById/:id", async (req, res) => {
  //
  const products = await ProductsModel.findById(req.params.id);

  if (!products) {
    res
      .status(404)
      .send({ message: `No Products found matching the following ID` });
  }
  res.status(200).json({
    productName: products.productName,
    price: products.price,
    category: products.category,
    company: products.company,
    productImage: products.productImage,
    description: products.description,
  });
});

//
//#######################################################

productsRouter.post(
  "/createProducts",
  uploadLocation.single("uploaded_file"),
  async (req, res, next) => {
    //
    const newProduct = new ProductsModel({
      productName: req.body.productName,
      price: req.body.price,
      category: req.body.category,
      company: req.body.company,
      productImage: req.file,
      description: req.body.description,
    });
    try {
      await newProduct.save();
      res.status(201).send({ newProduct });
    } catch (error) {
      res.status(404).send(error);
    }
  }
);

//
//#######################################################

productsRouter.put(
  "/updateProductsById/:id",
  uploadLocation.single("productImage"),
  async (req, res) => {
    let oldProductDetails = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      company: req.body.company,
      productImage: req.file,
      description: req.body.description,
    };
    //
    const product = await ProductsModel.findByIdAndUpdate(req.params.id, {
      $set: oldProductDetails,
    });

    if (!product) {
      res
        .status(404)
        .send({ message: `No Product found matching the following ID` });
    }
    res.status(200).send({ message: "Update Successful" });
  }
);

//
//#######################################################

productsRouter.delete("/deleteProductsById/:id", async (req, res) => {
  //
  const cat = await ProductsModel.findByIdAndDelete(req.params.id);

  if (!cat) {
    res.status(404).send({ message: `No task matching the following ID` });
  }
  res.status(200).send({ message: "Product Deleted" });
});

//#######################################################

module.exports = productsRouter;
