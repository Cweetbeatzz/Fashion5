const express = require("express");
require("dotenv").config();
const helmet = require("helmet");
const bodyParser = require("body-parser");
const usersRouter = require("./Controllers/UsersController");
const rolesRouter = require("./Controllers/RolesController");
const categoryRouter = require("./Controllers/CategoryController");
const productsRouter = require("./Controllers/ProductsController");
const authRouter = require("./Controllers/Auth");
const stripeRouter = require("./Controllers/StripeController");
const db = require("./Database/connection");
require("express-async-errors");
const cors = require("cors");

const app = express();
const { ensureLogginIn } = require("./Middlewares/LoggedInAuthorization");
const { ensureAdmin } = require("./Middlewares/AdminAuthorization");
const { ensureCeo } = require("./Middlewares/CeoAuthorization");
const { ensureManager } = require("./Middlewares/ManagerAuthorization");
const { ensureLogistics } = require("./Middlewares/LogisticsAuthorization");
const cookieParser = require("cookie-parser");
const passport = require("passport");
let session = require("express-session");
const http = require("http");
let server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//#############################################################

//<----------- middlewares ---------------->
//use static files
app.use("/uploads", express.static("./uploads"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

//
app.get("/", (req, res) => {
  res.send(`<h2>Welcome to Fashion5 API</h3>`);
});

//#############################################################

//<----------- routes ---------------->
app.use("/fashion5/api/v1/products", productsRouter);
app.use("/fashion5/api/v1/users", usersRouter);
app.use(
  "/fashion5/api/v1/roles",
  ensureLogginIn,
  ensureAdmin,
  ensureCeo,
  ensureManager,
  rolesRouter
);
app.use("/fashion5/api/v1/category", categoryRouter);
app.use("/fashion5/api/v1/auth", authRouter);
app.use("/fashion5/api/v1/stripe", stripeRouter);

//#############################################################

const port = process.env.PORT || 6800;
//#############################################################
// *Socket connection

io.on("connection", (client) => {
  client.emit("event", client.id);
  
  client.on("disconnect", () => {
    client.broadcast.emit("Call Ended");
  });

  client.on("CallUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("userToCall", { signal: signalData, from, name });
  });

  client.on("answerCall", (data) => {
    io.to(data.to).emit("allAccepted", data.signal);
  });
});
//#############################################################

//database check
const startDB = async () => {
  try {
    await db(
      process.env.MONGO_DB_CONNECTION_STRING ||
        "mongodb://localhost:27017/Fashion5"
    );
    //server connection
    server = app.listen(
      port,
      console.log(`Server is running on http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

//#############################################################

module.export = server;
startDB();
