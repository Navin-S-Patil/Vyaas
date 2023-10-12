const router = require("express").Router();
const Stock = require("../models/Stock");

router.get("/stocks", async (req, res) => {
  if (req.headers.key !== process.env.KEY)
    return res.status(401).send("Access Denied");

  try {
    const { symbol } = req.body;

    // Make sure 'symbol' is provided before querying the database
    if (!symbol) {
      return res
        .status(400)
        .json({ error: "Symbol is required in the query parameters." });
    }

    const stocks = await Stock.find({ symbol });
    res.status(200).json(stocks);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

module.exports = router;
