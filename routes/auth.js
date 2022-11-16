const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");



router.post("/register", async (req, res) => {
  console.log("registration");
  const newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    // return;
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
    // return;
  }
});
 
//LOGIN

router.post("/login", async (req, res) => {
  // console.log("login");
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json("Wrong credentials!");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if(OriginalPassword !== req.body.password){
      return res.status(401).json("Wrong Password!");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
    console.log("login");
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
});

module.exports = router;


/*
buy / order / purches
sell 
profit - loss
data-fetch
user add money (in month once) or fixed

change password

*/