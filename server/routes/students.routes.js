const express = require("express");
const User = require("../models/user.model");
const Qa = require("../models/qa.model");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ status: 200, message: "at /student/test" });
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, stdClass } = req.body;
    const student = await User.findOne({ email: email });
    if (student) {
      return res.json({ status: 401, message: "email already exist" });
    }
    const newStudent = new User({
      name: name,
      email: email,
      stdClass: stdClass,
      role: "STUDENT",
    });

    newStudent.save((err, student) => {
      if (err) {
        return res.json({ status: 401, message: err.message });
      }
      return res.json({
        status: 201,
        message: "student registered",
        student: student,
      });
    });
  } catch (err) {
    return res.json({ status: 401, message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.json({ status: 401, message: "user not found" });
    return res.json({ status: 200, user: user });
  } catch (err) {
    return res.json({ status: 401, message: err.message });
  }
});

router.post("/get/random/question", async (req, res) => {
  try {
    const recCount = await Qa.count();
    var r = Math.floor(Math.random() * recCount);
    const question = await Qa.find().limit(1).skip(r);
    return res.json({ status: 200, question: question });
  } catch (err) {
    return res.json({ status: 401, message: err.message });
  }
});

module.exports = router;
