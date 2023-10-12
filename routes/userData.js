const router = require("express").Router();
const User = require("../models/User");

router.get("/userdata", async (req, res) => {
  try {
    if (req.headers.key !== process.env.UPDATE_KEY) {
      return res.status(401).send("Access Denied");
    }

    const user = await User.findOne({ username: req.headers.username });

    if (!user) {
      return res.status(201).send({ message: "User not found" });
    }

    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
