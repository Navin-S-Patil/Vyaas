const router = require("express").Router();
const createTransaction = require("../middleware/createTransaction");

// POST request to buy new stocks transaction
router.post("/buy", async (req, res) => {
  await createTransaction(req, res, "BUY");
  
});

// POST request to sell stocks transaction
router.post("/sell", async (req, res) => {
  await createTransaction(req, res, "SELL");
});

module.exports = router;
