const Transaction = require("../models/Transaction");
const User = require("../models/User");
const Stock = require("../models/Stock");
const Portfolio = require("../models/Portfolio");

const createNewTransaction = async (userId, stockId, type, quantity, price) => {
  const newTransaction = new Transaction({
    user: userId,
    stock: stockId,
    type,
    quantity,
    price,
  });
  await newTransaction.save();
};

const updateUserBalance = async (user, type, quantity, price) => {
  user.balance += (type === "BUY" ? -1 : 1) * quantity * price;
};

const updateStockInPortfolio = async (
  portfolio,
  existingStock,
  type,
  quantity,
  price
) => {
  const portfolioStock = await portfolio.stocks.find((portfolioStock) =>
    portfolioStock.stock.equals(existingStock._id)
  );

  //checks
  if (portfolioStock && portfolioStock.quantity < quantity && type === "SELL") {
    return res
      .status(400)
      .json({ error: "You don't have enough stocks to sell" });
  }

  if (type === "BUY") {
    //if the stock if buy for the first time
    if (!portfolioStock) {
      portfolio.stocks.push({
        stock: existingStock._id,
        name: existingStock.symbol,
        quantity,
        originalBuyPrice: [price],
        averagePrice: price,
      });
    } else {
      //if the stock is already present in the portfolio
      portfolioStock.quantity += Number(quantity);
      for (let i = 0; i < quantity; i++) {
        portfolioStock.originalBuyPrice.push(price);
      }
      portfolioStock.averagePrice =
        portfolioStock.originalBuyPrice.reduce((a, b) => a + b) /
        portfolioStock.originalBuyPrice.length;
    }
  }
  //for the sell part
  else {
    portfolioStock.quantity -= Number(quantity);

    if (portfolioStock.quantity === 0) {
      portfolio.stocks = portfolio.stocks.filter(
        (portfolioStock) => !portfolioStock.stock.equals(existingStock._id)
      );
    } else {
      // remove the og buy price from array from the start
      for (let i = 0; i < quantity; i++) {
        portfolioStock.originalBuyPrice.shift();
      }

      // Update the average price
      portfolioStock.averagePrice =
        portfolioStock.originalBuyPrice.reduce((a, b) => a + b) /
        portfolioStock.originalBuyPrice.length;
    }
  }
};

const manageStockCount = async (stock, quantity, type) => {
  if (type === "BUY") {
    stock.quantity -= Number(quantity);
  } else {
    stock.quantity += Number(quantity);
  }
  await stock.save();
};

const createTransaction = async (req, res, type) => {
  try {
    const { username, stock, quantity, price } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const existingStock = await Stock.findOne({ symbol: stock });
    if (!existingStock) {
      return res.status(404).json({ error: "Stock not found." });
    }

    const userPortfolio = await Portfolio.findOne({ user: user._id });

    // checks
    if(quantity <= 0){
      return res.status(400).json({ error: "Quantity should be greater than 0" });
    }
    if (existingStock.quantity < quantity && type === "SELL") {
      return res
        .status(400)
        .json({ error: "Not enough stocks in Market to sell" });
    }
    if (userPortfolio.stocks.quantity < quantity && type === "SELL") {
      return res
        .status(400)
        .json({ error: "You don't have enough stocks to sell" });
    }
    if (userPortfolio.stocks.length === 0 && type === "SELL") {
      return res
        .status(400)
        .json({ error: "You don't have enough stocks to sell" });
    }

    await createNewTransaction(
      user._id,
      existingStock._id,
      type,
      quantity,
      price
    );
    updateUserBalance(user, type, quantity, price);

    const portfolio = await Portfolio.findOne({ user: user._id });

    updateStockInPortfolio(portfolio, existingStock, type, quantity, price);

    manageStockCount(existingStock, quantity, type);

    await user.save();
    await portfolio.save();

    res.json("Transaction added!");
  } catch (err) {
    res.status(400).json({ error: "Error: " + err.message });
  }
};

module.exports = createTransaction;
