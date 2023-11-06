const router = require("express").Router();
const {
  authUser,
  registerUser,
  loggoutUser,
  getUserProfile,
  updateUserProfile,
  fetchUserBal,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", loggoutUser);
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile);
router.route("/balance").get(protect,fetchUserBal);

module.exports = router;
