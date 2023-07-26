const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true, unique: true },
    companyName: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, default: 0 },
    historicalData: [{ date: Date, price: Number }],
  },
  { timestamps: true }
);


module.exports = mongoose.model("Stock", StockSchema);
