const express = require("express");
require("dotenv").config();
const usersRouter = require("./Controllers/UsersController");
const categoryRouter = require("./Controllers/CategoryController");
const productsRouter = require("./Controllers/ProductsController");
const authRouter = require("./Controllers/Auth");
const stripeRouter = require("./Controllers/StripeController");
const app = express();
const db = require("./Database/connection");
require("express-async-errors");
const cors = require("cors");

//<----------- middlewares ---------------->
//use static files
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//
app.get("/", (req, res) => {
  res.send(`<h2>Welcome to Fashion5 API</h3>`);
});
//#############################################################

//#############################################################

//<----------- routes ---------------->
app.use("/fashion5/api/v1/products", productsRouter);
app.use("/fashion5/api/v1/users", usersRouter);
app.use("/fashion5/api/v1/category", categoryRouter);
app.use("/fashion5/api/v1/auth", authRouter);
app.use("/fashion5/api/v1/stripe", stripeRouter);

const port = process.env.PORT || 6800;

//#############################################################

//database check
const startDB = async () => {
  try {
    await db(
      process.env.MONGO_DB_CONNECTION_STRING ||
        "mongodb://localhost:27017/Fashion5"
    );
    //server connection
    app.listen(
      port,
      console.log(`Server is running on http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startDB();
