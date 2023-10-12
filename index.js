const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config({ path: "./config.env" });

const authRoute = require("./routes/auth");
const userData = require("./routes/userData");
const stocksDataFetching = require("./routes/stocksDataFetching");
const manualStockRefresh = require("./routes/manualStockRefresh");
const transaction = require("./routes/transaction");
const portfolioData = require("./routes/portfolioData");

const updateStocksData = require("./middleware/stockUpdate");

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 30000 })
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/auth", userData);
app.use("/api/auth", portfolioData);
app.use("/api/", stocksDataFetching);
app.use("/api/", transaction);

//for testing and individual call to update stock data
app.use("/api/", manualStockRefresh);

//Stock data update every 24 hours
setInterval(updateStocksData, 86400000);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running! " + process.env.PORT);
});
