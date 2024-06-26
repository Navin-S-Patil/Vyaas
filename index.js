const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config({ path: "./config.env" });
const cookieParser = require("cookie-parser");

const stocksDataFetching = require("./routes/stocksDataFetching");
const manualStockRefresh = require("./routes/manualStockRefresh");
const transaction = require("./routes/transaction");
const portfolioData = require("./routes/portfolioData");
const userRoute = require("./routes/userRoute");
const stockRoute = require("./routes/stockRoute");
const addcredits = require("./routes/addCredits");

const updateStocksData = require("./middleware/stockUpdate");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 30000 })
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    
    origin: process.env.NODE_ENV === "production" ? "https://vyaas-client.onrender.com" : "http://localhost:3000", // The URL of your frontend
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/", portfolioData);
app.use("/api/", stocksDataFetching);
app.use("/api/", transaction);
app.use("/api/", addcredits);

app.use("/api/users", userRoute);
app.use("/api/stocks", stockRoute);

//for testing and individual call to update stock data
app.use("/api/", manualStockRefresh);

//Stock data update every 24 hours
setInterval(updateStocksData, 86400000);

//custom error handler
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running! " + process.env.PORT);
});
