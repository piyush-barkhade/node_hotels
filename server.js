const express = require("express");
const app = express();
const db = require("./db.js");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const MenuItem = require("./models/MenuItem.js");

app.get("/", function (req, res) {
  res.send("Welcome to our Hotel");
});

const personRoutes = require("./routes/personRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");

app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(3000, () => {
  console.log("listening");
});
