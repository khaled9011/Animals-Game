const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Profile = new schema({
  user: {
    type: schema.Types.ObjectId,
    ref: "Users",
  },
  handle: {
    type: String,
    required: true,
    max: 40,
  },
  bio: {
    type: String,
    max: 400,
  },
  role: {
    type: String,
    default: "Explorer",
  },
  score: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
  },
  favAnimal: {
    type: String,
  },
  social: {
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Profile", Profile);
