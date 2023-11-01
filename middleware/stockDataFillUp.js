const mongoose = require('mongoose');
const axios = require('axios');
require("dotenv").config({ path: "../config.env" });
const Stock = require("../models/Stock");

const companyNames = [
  // "AXISBANK",
  // "TCS",
  // "BHARTIARTL",
  // "BPCL",
  // "BAJAJFINSV",
  // "CIPLA",
  // "JSWSTEEL",
  // "ICICIBANK",
  // "GAIL",
  "RELIANCE",
]

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 30000 });
    console.log("DB Connection Successful!");

    // Use Promise.all to wait for all asynchronous calls to complete
    await Promise.all(companyNames.map(async (item) => {
      await addStocksData(item);
    }));

    console.log("All stocks data added successfully");
  } catch (err) {
    console.log(err);
  } finally {
    // Close the MongoDB connection after all operations are complete
    mongoose.disconnect();
  }
}

async function addStocksData(name) {
  try {
    console.log("Adding stocks data... started " + name);

    const data = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=RELIANCE.BSE&outputsize=full&apikey=demo`
      // `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AXISBANK.BSE&outputsize=full&apikey=374IRTQTIUTYVL9A`
    );
    
   
    const timeSeries = data.data["Time Series (Daily)"];

    const priceData = Object.entries(timeSeries).map(([date, price]) => {
      return { date: new Date(date), price: price["4. close"] };
    });

    const stock = await Stock.create({
      symbol: `${name}.BSE`,
      companyName: `${name}`,
      historicalData: priceData,
      quantity: 1000,
    });

    console.log("Stock data added", name);
  } catch (error) {
    console.log(error);
  }
}

start();
