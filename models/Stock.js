const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true, unique: true },
    companyName: { type: String, required: true },
    // price: { type: Number, required: true, min: 0 },
    historicalData: [{ date: Date, price: Number }],
    quantity: { type: Number, default: 0 },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Stock", StockSchema);
