const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  stocks: [
    {
      stock: { type: mongoose.Schema.Types.ObjectId, ref: "Stock", required: true },
      name : { type: String, required: true },
      quantity: { type: Number, required: true },
      originalBuyPrice : [{ type: Number, required: true }],
      averagePrice: { type: Number, required: true },
    },
  ],
});


module.exports = mongoose.model("Portfolio", portfolioSchema);
