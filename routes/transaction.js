const router = require("express").Router();
const createTransaction = require("../middleware/createTransaction");
const protect = require("../middleware/authMiddleware");

// POST request to buy new stocks transaction
router.post("/buy", protect, async (req, res) => {
  await createTransaction(req, res, "BUY");
});

// POST request to sell stocks transaction
router.post("/sell", protect, async (req, res) => {
  await createTransaction(req, res, "SELL");
});




module.exports = router;
