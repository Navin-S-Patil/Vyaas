const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    stockId: { type: String, required: true, index: true },
    quantity: { type: Number, required: true, min: 1 },
    transactionDate: { type: Date, required: true },
    transactionType: {
      type: String,
      required: true,
      enum: ["buy", "sell"],
    },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
