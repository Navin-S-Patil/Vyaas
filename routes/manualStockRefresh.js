const router = require("express").Router();
const updateStocksData = require("../middleware/stockUpdate");

router.get("/updateStocks", async (req, res) => {
  try {
    if(req.query.key !== process.env.UPDATE_KEY) return res.status(401).json("Unauthorized");
    await updateStocksData();
    res.status(200).json("Stocks updated");
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;