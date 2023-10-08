const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config({ path: "./config.env" });
const cors = require("cors");

const authRoute = require("./routes/auth");
const userData = require("./routes/userData");
const stocksDataFetching = require("./routes/stocksDataFetching");
const updateStocksData = require("./middleware/stockUpdate");

dotenv.config();

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
app.use("/api/", stocksDataFetching);

//Stock data update every 24 hours
setInterval(updateStocksData, 86400000);

//for testing and individual call to update stock data
// app.get("/updateStocks", async (req, res) => {
//   try {
//     await updateStocksData();
//     res.status(200).json("Stocks updated");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running! " + process.env.PORT);
});
