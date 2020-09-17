const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Trivia = new schema({
  question: {
    type: String,
    required: true,
  },
  answers: {
    answer1: {
      type: String,
      required: true,
    },
    answer2: {
      type: String,
      required: true,
    },
    answer3: {
      type: String,
      required: true,
    },
    answer4: {
      type: String,
      required: true,
    },
  },
  correct: {
    index: {
      type: Number,
      required: true,
    },
  },
});

module.exports = mongoose.model("Trivia", Trivia);
