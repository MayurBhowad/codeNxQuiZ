const express = require("express");
const Admin = require("../models/user.model");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ status: 200, message: "at /admin/test" });
});

router.post("/register", async (req, res) => {
  const { name, email } = req.body;
  const admin = await Admin.findOne({ email: email });
  if (admin) {
    return res.json({ status: 401, message: "email already exist" });
  }
  const newAdmin = new Admin({
    name: name,
    email: email,
    role: "ADMIN",
  });

  return res.json({
    status: 201,
    message: "admin registered",
    admin: newAdmin,
  });
});

module.exports = router;
