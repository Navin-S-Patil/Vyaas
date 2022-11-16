const router = require("express").Router();
const User = require("../models/User");

router.get("/userdata", async (req, res) => {
    // const userId = req.headers._id;
  const user = await User.findOne({_id: req.headers._id}, (err, user) => {
    try {
      if (err) {
        console.log(err);
      } else {
        console.log(user.fName);
        res.send(user);
      }
    } catch (err) {
      console.log(err);
    }
  });
});

module.exports = router;
