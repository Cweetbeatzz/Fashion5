const CategoryModel = require("../Models/Category");
const express = require("express");
const categoryRouter = express.Router();

//
//#######################################################

categoryRouter.get("/getAllCategories", async (req, res) => {
  const categories = await CategoryModel.find({});
  res.status(200).send(categories);
});

//
//#######################################################

categoryRouter.get("/getCategoriesById/:id", async (req, res) => {
  //
  const category = await CategoryModel.findById(req.params.id);

  if (!category) {
    res
      .status(404)
      .send({ message: `No Category found matching the following ID` });
  }
  res.status(200).send(category);
});

//
//#######################################################

categoryRouter.post("/createCategories", async (req, res) => {
  const newCategory = new CategoryModel({
    categoryName: req.body.categoryName,
  });
  try {
    const created = await newCategory.save();
    res.status(201).json({ category: created.categoryName });
  } catch (error) {
    res.status(404).send(error);
  }
});

//
//#######################################################

categoryRouter.put("/updateCategoriesById/:id", async (req, res) => {
  let oldCategoryName = { categoryName: req.body.categoryName };
  //
  const cat = await CategoryModel.findByIdAndUpdate(req.params.id, {
    $set: oldCategoryName,
  });

  if (!cat) {
    res
      .status(404)
      .send({ message: `No Category found matching the following ID` });
  }

  res
    .status(200)
    .send([{ message: "Update Successful" }, { category: cat.categoryName }]);
});

//
//#######################################################

categoryRouter.delete("/deleteCategoriesById/:id", async (req, res) => {
  let itemToDelete = { categoryName: req.body.categoryName };
  //
  const cat = await CategoryModel.findByIdAndDelete(req.params.id);

  if (!cat) {
    res.status(404).send({ message: `No task matching the following ID` });
  }
  res.status(200).send({});
});

//#######################################################

module.exports = categoryRouter;
