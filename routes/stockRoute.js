const router = require("express").Router();
const {
  profitHandler,
  investHandler,
  getUserBalance,
} = require("../controllers/stockController");

const protect = require("../middleware/authMiddleware");

router.post("/profit", protect, profitHandler);
router.post("/invest", protect, investHandler);
router.post("/balance", protect, getUserBalance);

module.exports = router;
