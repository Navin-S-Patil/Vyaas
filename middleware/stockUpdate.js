const Stock = require("../models/Stock");
const list = require("./stockData");
const axios = require("axios");
require("dotenv").config({ path: "../config.env" });

const mongoose = require("mongoose");

// update stocks data
async function updateStocksData() {
  //for now testing purpose
  await mongoose
    .connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 30000 })
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
      console.log(err);
    });

  console.log("Updating stocks started");

  
  // get stocks data from API
  list.forEach(async (stock) => {

    const stocksData = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&outputsize=full&apikey=${process.env.API_KEY}`
      );
      

    // get historical data
    const historicalData = [];
    for (let key in stocksData.data["Time Series (Daily)"]) {
      historicalData.push({
        date: key,
        price: stocksData.data["Time Series (Daily)"][key]["4. close"],
      });
    }

    // update stock data
    await Stock.findOneAndUpdate(
      { symbol: stock },
      {
        // companyName: stocksData.data["Meta Data"]["2. Symbol"],
        historicalData: historicalData,
      }
    );
  });
  // const stocksData = await axios.get(
  //   `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=airtel.BSE&outputsize=full&apikey=${process.env.API_KEY}`
  // );
}

// Update stocks data every 25 hours (25 * 60 * 60 * 1000 milliseconds)
// const updateInterval = 25 * 60 * 60 * 1000;
// setInterval(updateStocksData, updateInterval);

updateStocksData();
