const mongoose = require("mongoose");
const validator = require("validator");

const newsLetterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
});
module.exports = mongoose.model("Newsletter", newsLetterSchema);
