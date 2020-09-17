const mongoose = require("mongoose");
const schema = mongoose.Schema;

const User = new schema({
  name: {
    type: String,
    max: 20,
    required: true,
  },
  password: {
    type: String,
    max: 20,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Users", User);
