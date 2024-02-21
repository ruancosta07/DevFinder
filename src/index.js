require("dotenv").config();
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const SESSION_KEY = process.env.SESSION_KEY;
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const hbs = require("hbs");
const main = require("./routes/main");
const bodyParser = require("body-parser");
const port = 3000;
const flash = require("connect-flash");
const session = require("express-session");
const bcrypt = require("bcrypt");
require("./models/Usuario");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(
  session({
    secret: "devfinder123",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.userSuccess = req.flash("userSuccess");
  res.locals.vagaSuccess = req.flash("vagaSuccess");
  res.locals.emailExists = req.flash("emailExists");
  res.locals.password_incorrect = req.flash("password_incorrect");
  res.locals.user_not_found = req.flash("user_not_found");
  res.locals.vaga_delete = req.flash("vaga_delete");
  next();
});
app.use(express.static(path.join(__dirname + "../../" + "/public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "templates/views"));
hbs.registerPartials(path.join(__dirname, "templates/partials"));
hbs.registerHelper("split", function (context, options) {
  if (!context) {
    return [];
  }
  return context.split(options);
});

hbs.registerHelper("truncate", function (str, len) {
  if (str.length > len) {
    return str.substring(0, len) + "...";
  } else {
    return str;
  }
});

hbs.registerHelper("limit", function (arr, limit) {
  if (!Array.isArray(arr)) {
    return [];
  }
  return arr.slice(0, limit);
});

hbs.registerHelper("eq", function (a, b) {
  return a === b;
});

hbs.registerHelper("equals", function (a, b, options) {
  if (a != undefined && b != undefined) {
    if (a == b) {
      console.log("a equals b");
      return options.fn(this);
    } else {
      console.log("a does not equal b");
      return options.inverse(this);
    }
  }
});

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.wqjbbwo.mongodb.net/`
  )
  .then(() => {
    console.log("conectado ao db");
  })
  .catch(() => {
    console.log("erro ao conectar");
  });
app.use("/", main);

app.use(function (req, res, next) {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`Server running at ${port} port`);
});
