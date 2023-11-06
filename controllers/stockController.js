const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Portfolio = require("../models/Portfolio");
const Stock = require("../models/Stock");
const generateToken = require("../utils/generateTokens");

//@desc    Auth user/set token
//route    POST /api/users/auth
//@access  Private
const profitHandler = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  // Find the user and their portfolio
  const user = await User.findById(_id);
  const userPortfolio = await Portfolio.findOne({ user: _id });

  // Calculate profit for each stock in the portfolio
  const profitPromises = userPortfolio.stocks.map(async (portfolioItem) => {
    const stock = await Stock.findById(portfolioItem.stock);
    const currentPrice = stock.historicalData[0].price;
    // Calculate profit based on the average buy price and current price
    const totalInvestment = portfolioItem.quantity * portfolioItem.averagePrice;
    const currentValue = portfolioItem.quantity * currentPrice;
    const profit = currentValue - totalInvestment;

    return {
      stock: stock.symbol,
      profit,
    };
  });

  // Wait for all profit calculations to complete
  const individualProfits = await Promise.all(profitPromises);

  // You can now send or use individualProfits as needed
  res.json({ individualProfits });
});

//testing is pending
const investHandler = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  const investedAmountResult = await Portfolio.aggregate([
    {
      $match: { user: mongoose.Types.ObjectId(_id) },
    },
    {
      $unwind: "$stocks",
    },
    {
      $group: {
        _id: null,
        totalInvestedAmount: {
          $sum: { $multiply: ["$stocks.averagePrice", "$stocks.quantity"] },
        },
      },
    },
  ]);

  const investedAmount =
    investedAmountResult.length > 0
      ? investedAmountResult[0].totalInvestedAmount
      : 0;

  res.json({ investedAmount });
});

const getUserBalance = async (req, res) => {
  try {
    const { id } = req.body;

    if (id === null) {
      return res.status(401).json({ message: "empty id not allowed" });
    }

    const {balance} = await User.findById(req.body._id);

    res.status(201).json(balance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  profitHandler,
  investHandler,
  getUserBalance,
};
