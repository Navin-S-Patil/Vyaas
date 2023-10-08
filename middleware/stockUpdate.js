const Stock = require("../models/Stock");
const list = require("./stockData");
const axios = require("axios");
require("dotenv").config({ path: "../config.env" });

const mongoose = require("mongoose");

async function getStockData(stock) {
  const response = await axios.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&outputsize=full&apikey=${process.env.API_KEY}`
  );
  return response.data;
}

async function formatHistoricalData(stockData) {
  const historicalData = [];
  for (let key in stockData["Time Series (Daily)"]) {
    historicalData.push({
      date: key,
      price: stockData["Time Series (Daily)"][key]["4. close"],
    });
  }
  return historicalData;
}

async function updateStock(stock, index) {
  try {
    const stocksData = await getStockData(stock);
    const historicalData = await formatHistoricalData(stocksData);

    await Stock.findOneAndUpdate(
      { symbol: stock },
      {
        historicalData: historicalData,
      }
    );

    console.log(stock + " updated");

    // Introduce a 1-minute delay after every five API calls
    if ((index + 1) % 5 === 0) {
      console.log("Waiting for 1 minute...");
      await new Promise(resolve => setTimeout(resolve, 60000));
    }
  } catch (error) {
    console.error(`Error updating ${stock}:`, error.message);
  }
}

async function updateStocksData() {
  try {
    // await mongoose.connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 30000 });
    // console.log("DB Connection Successful!");

    console.log("Updating stocks started");

    // Use for...of loop with index to track API calls
    for (let index = 0; index < list.length; index++) {
      await updateStock(list[index], index);
    }

    // Close the database connection
    // mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// updateStocksData();

module.exports = updateStocksData;
