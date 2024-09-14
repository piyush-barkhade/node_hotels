const express = require("express");
const router = express.Router();

const MenuItem = require("./../models/MenuItem.js");
const Person = require("./../models/Person.js");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ e: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "internal server error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
      const response = await Person.find({ taste: tasteType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ e: "Invalid taste type" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "internal server error" });
  }
});

module.exports = router;
