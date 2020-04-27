const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const upload = require("express-fileupload");

app.use(upload());
console.log("Server Started!");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(logger("dev"));
// const whitelist = ['localhost:3000'];
// const corsOptions = {
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Headers":
//       "Origin, X-Requested-With, Content-Type, Accept"
//   };
app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    resave: false,
    secret: "hello",
    saveUninitialized: true,
    is_logged_in: false,
  })
);

const indexRouter = require("./routes/index");
app.use("/", indexRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

module.exports = app;
