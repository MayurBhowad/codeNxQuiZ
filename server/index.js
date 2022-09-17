const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(express.json());

app.use("/admin", require("./routes/admin.routes"));
app.use("/student", require("./routes/students.routes"));

//ROUTES
app.get("/", (req, res) => {
  res.send("app.js..app.get");
});

//DB connection
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log("db connection error: ", err);
    }
    console.log("DB Connected..");
  }
);

app.listen(3000, () => console.log("server is up.."));
