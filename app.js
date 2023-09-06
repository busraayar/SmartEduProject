const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const pageRoute = require("./routers/pageRouter");
const courseRoute = require("./routers/courseRouter");
const categoryRoute = require("./routers/categoryRouter");
const userRoute = require("./routers/userRouter");

const app = express();

//Connect DB
mongoose.connect("mongodb://localhost/smartedu-db").then(() => {
  console.log("DB connected successfully");
});

//Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(
  session({
    secret: "my_keyboard_cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost/smartedu-db" }),
  })
);
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

//GLOBAL VARIABLES
global.userIN = null;
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});

//ROUTERS
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

const port = 3000;
app.listen(port, (res, req) => {
  console.log(`App starter on port ${port}`);
});
