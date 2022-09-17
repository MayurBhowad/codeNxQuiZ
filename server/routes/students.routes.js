const express = require("express");
const User = require("../models/user.model");

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

    newStudent.save();

    return res.json({
      status: 201,
      message: "student registered",
      student: newStudent,
    });
  } catch (err) {
    return res.json({ status: 401, message: err.message });
  }
});

module.exports = router;
