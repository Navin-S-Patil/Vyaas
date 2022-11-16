const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config({ path: "./config.env" });
const authRoute = require("./routes/auth");
const cors = require("cors");
const userData = require("./routes/userData");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/auth", userData);


app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running! " + process.env.PORT);
});
