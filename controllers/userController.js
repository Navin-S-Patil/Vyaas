const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Portfolio = require("../models/Portfolio");
const generateToken = require("../utils/generateTokens");



//@desc    Auth user/set token
//route    POST /api/users/auth
//@access  Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid username or password");
  }
});

//@desc    Register new user
//route    POST /api/users
//@access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { fname, lname, username, email, password } = req.body;

  // Check if the username is already taken
  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  // Create a new user
  const newUser = await User.create({
    fname,
    lname,
    username,
    email,
    password,
  });

  // Create a new portfolio for the user
  const newPortfolio = new Portfolio({ user: newUser._id });
  newUser.portfolio = newPortfolio._id;

  // Save the portfolio and user
  await Promise.all([newPortfolio.save(), newUser.save()]);

  if (newUser) {
    generateToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      fname: newUser.fname,
      lname: newUser.lname,
      username: newUser.username,
      email: newUser.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc    logout user
//route    POST /api/users/logout
//@access  Public
const loggoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "User Loggout",
  });
});

//@desc    Get user profile
//route    GET /api/users/profile
//@access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id : req.user._id,
        fname : req.user.fname,
        lname : req.user.lname,
        username : req.user.username,
        email : req.user.email,
        balance : req.user.balance,
    }

  res.status(200).json(user);
});

//@desc    Update user profile
//route    PUT /api/users/profile
//@access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.fname = req.body.fname || user.fname;
        user.lname = req.body.lname || user.lname;
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.status(200).json({
            _id : updatedUser._id,
            fname : updatedUser.fname,
            lname : updatedUser.lname,
            username : updatedUser.username,
            email : updatedUser.email,
            balance : updatedUser.balance,
        })
    }else{
        res.status(401);
        throw new Error("User not found");
    }
  res.status(200).json({
    message: "Update user profile",
  });
});

module.exports = {
  authUser,
  registerUser,
  loggoutUser,
  getUserProfile,
  updateUserProfile,
};
