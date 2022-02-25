const express = require("express");
const categoryRouter = express.Router();

const {
  getAllCategories,
  createCategories,
  getCategoriesById,
  updateCategoriesById,
  deleteCategoriesById,
} = require("../Controllers/CategoryController");

categoryRouter.route("/").get(getAllCategories);
categoryRouter.route("/").post(createCategories);
categoryRouter.route("/:id").get(getCategoriesById);
categoryRouter.route("/:id").patch(updateCategoriesById);
categoryRouter.route("/:id").delete(deleteCategoriesById);

module.exports = categoryRouter;
