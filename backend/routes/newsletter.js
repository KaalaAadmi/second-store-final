const router = require("express").Router();
const Newsletter = require("../models/Newsletter");

// ADD Email
router.post("/newsletter", async (req, res) => {
  const newEmail = new Newsletter(req.body);
  try {
    const savedEmail = await newEmail.save();
    const val = savedEmail._doc;
    res.status(200).json({ val, success: true });
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
