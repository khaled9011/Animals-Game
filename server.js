const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { mongoURI } = require("./config/keys");
const users = require("./routes/users");
const profile = require("./routes/profile");
const port = 5000;
const passport = require("passport");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
require("./config/passport")(passport);

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to Database");
  }
);
mongoose.set("useCreateIndex", true);

app.get("/", (req, res) => {
  res.json({
    msg: "hello world",
  });
});

app.use("/users", users);
app.use("/profile", profile);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
