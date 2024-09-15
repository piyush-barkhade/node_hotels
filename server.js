const express = require("express");
const app = express();
const db = require("./db.js");
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const MenuItem = require("./models/MenuItem.js");

app.get("/", function (req, res) {
  res.send("Welcome to our Hotel");
});

const personRoutes = require("./routes/personRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");

app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log("listening");
});
