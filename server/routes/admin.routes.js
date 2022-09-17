const express = require("express");
const User = require("../models/user.model");
const Qa = require("../models/qa.model");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ status: 200, message: "at /admin/test" });
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, addedByID } = req.body;

    const addedByAdmin = await User.findById(addedByID);
    if (!addedByID || addedByAdmin.role !== "ADMIN")
      return res.json({ status: 405, message: "unauthorized" });

    const admin = await User.findOne({ email: email });
    if (admin) {
      return res.json({ status: 401, message: "email already exist" });
    }
    const newAdmin = new User({
      name: name,
      email: email,
      role: "ADMIN",
      addedBy: addedByID,
    });
    newAdmin.save((err, admin) => {
      if (err) {
        return res.json({ status: 401, message: err.message });
      }
      return res.json({
        status: 201,
        message: "admin registered",
        admin: admin,
      });
    });
  } catch (err) {
    return res.json({ status: 401, message: err.message });
  }
});

router.post("/add/question", async (req, res) => {
  try {
    const {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      addedBy,
    } = req.body;
    const newQuestion = new Qa({
      question: question,
      optionA: optionA,
      optionB: optionB,
      optionC: optionC,
      optionD: optionD,
      correctAnswer: correctAnswer,
      addedBy: addedBy,
    });
    newQuestion.save((err, question) => {
      if (err) return res.json({ status: 401, message: err.message });
      return res.json({ status: 201, message: "added successfully" });
    });
  } catch (err) {
    return res.json({ status: 401, message: err.message });
  }
});

module.exports = router;
