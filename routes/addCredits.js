const router = require("express").Router();
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

router.put("/addcredits", protect, (req, res) => {
  // Add credits to user account
  try {
    const { credits } = req.body;
    const user = req.user;
    user.credits += credits;
    user.save();
    res.send("Credits added");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;