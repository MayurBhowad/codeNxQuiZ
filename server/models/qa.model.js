const mongoose = require("mongoose");

const QaSchema = mongoose.Schema({
  question: {
    type: String,
    require: true,
  },
  optionA: {
    type: String,
    require: true,
  },
  optionB: {
    type: String,
    require: true,
  },
  optionC: {
    type: String,
    require: true,
  },
  optionD: {
    type: String,
    require: true,
  },
  correctAnswer: {
    type: String,
    require: true,
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("qas", QaSchema);
