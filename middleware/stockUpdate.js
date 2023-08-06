const User = require("../models/Stock");

//update stocks data
function updateStocksData() {
  console.log("Updating stocks data...");
  
}

// Update stocks data every 25 hours (25 * 60 * 60 * 1000 milliseconds)
const updateInterval = 25 * 60 * 60 * 1000;
setInterval(updateStocksData, updateInterval);

updateStocksData();
