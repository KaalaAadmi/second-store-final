const router = require("express").Router();
const User = require("../models/User");
const Otp = require("../models/Otp");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  // console.log(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(201).json({ success: true, savedUser });
  } catch (err) {
    res.status(500).json(err.stack);
  }
});

router.post("/login", async (req, res) => {
  try {
    // console.log(req.body);
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    !user && res.status(401).json("Wrong credentials! EMAIL");
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password &&
      res.status(401).json("Wrong credentials! Password");
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    console.log(user);
    const { password, ...others } = user._doc;
    res.cookie("token", accessToken, {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err.stack);
  }
});

// Logout user
router.get("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

//FORGOT PASSWORD
router.post("/sendEmail", async (req, res) => {
  const data = await User.findOne({ email: req.body.email });
  if (data) {
    const otpcode = Math.floor(Math.random() * 10000 + 1);
    const otpStore = await Otp.findOne({ email: req.body.email });
    const otpData = new Otp({
      email: req.body.email,
      code: otpcode,
      expiresIn: new Date().getTime() + 300 * 1000,
    });
    if (otpStore) {
      const newOtp = {
        ...otpStore._doc,
        code: otpcode,
        expiresIn: new Date().getTime() + 300 * 1000,
      };
      const response = await Otp.updateOne(otpStore, newOtp);
    } else {
      const response = await otpData.save();
    }
    sendEmail(req.body.email, otpcode, data.name);
    res.status(201).json({ success: true, message: "OTP sent" });
  } else {
    res
      .status(400)
      .json({ success: true, message: "No account exists with this email" });
  }
});
function sendEmail(email, otp, name) {
  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USERNAME, // Sender address
    to: "arnav264@gmail.com", // List of recipients
    subject: "Password Reset OTP", // Subject line
    text: `Hello ${name}, \n\nYour Password Reset OTP is:\n\n${otp}\n\nIf you did not request for it, then please ignore`, // Plain text body
  };
  transport.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
    }
  });
}

router.post("/checkOtp", async (req, res) => {
  const data = await Otp.find({ email: req.body.email, code: req.body.code });
  if (data) {
    const currentTime = new Date().getTime();
    const difference = data.expiresIn - currentTime;
    if (difference < 0) {
      res.status(400).json({ success: false, message: "Token expired" });
    } else {
      res.status(200).json({ success: true });
    }
  } else {
    res.status(404).json({ success: false, message: "Invalid OTP" });
  }
});

router.post("/changePassword", async (req, res) => {
  const user = await User.find({ email: req.body.email });
  const code = await Otp.findOne({ email: req.body.email });
  if (user) {
    const updatedUser = {
      ...user,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
      updatedAt: new Date(),
    };
    const response = await User.updateOne({ user }, updatedUser);
    res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } else {
    res.status(400).json({ success: false, message: "No account found" });
  }
});

module.exports = router;
