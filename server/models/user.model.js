const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  stdClass: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    require: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", UserSchema);
