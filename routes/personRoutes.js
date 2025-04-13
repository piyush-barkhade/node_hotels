const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware, generateToken } = require("./../jwt.js");
const Person = require("./../models/Person.js");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("data saved");

    const payload = {
      id: response.id,
      username: response.username,
    };
    const token = generateToken(payload);
    console.log("token generated", token);

    res.status(200).json({ response: response, token: token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Person.findOne({ username: username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "invalid username or password" });
    }

    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);

    res.json({ token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "internal server error" });
  }
});

router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "internal server error" });
  }
});

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("user Data", userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({ user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ e: "Invalid work type" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatePersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatePersonData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      return res.status(400).json({ error: "Person not found" });
    }

    console.log("data Updated");
    res.sendStatus(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(400).json({ error: "Person not found" });
    }

    console.log("Data Deleted");
    res.status(200).json({ message: "person deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "internal server error" });
  }
});

module.exports = router;
