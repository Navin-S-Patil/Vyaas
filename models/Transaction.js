const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },
    type: { type: String, enum: ["BUY", "SELL"], required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
