const mongoose = require("mongoose");
const validator = require("validator");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email address"],
    },
    code: String,
    expiresIn: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Otp", otpSchema);
