const express = require("express");
const app = express();
const db = require("./db.js");
require("dotenv").config();
const passport = require("./auth.js");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const MenuItem = require("./models/MenuItem.js");

const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} Request made to : ${req.originalUrl}`
  );
  next();
};

app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate("local", { session: false });
app.get("/", function (req, res) {
  res.send("Welcome to our Hotel");
});

const personRoutes = require("./routes/personRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");

app.use("/person", localAuthMiddleware, personRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log("listening");
});
