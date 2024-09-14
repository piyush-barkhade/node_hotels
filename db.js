const mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017/hotels";
mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected");
});

db.on("error", (e) => {
  console.error("Connected", e);
});

db.on("disconnected", () => {
  console.log("Disconnected");
});

module.exports = db;
