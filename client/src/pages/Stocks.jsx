import React from "react";
import Navbar from "../components/Navbar";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";
import Invested from "../components/Invested";
import StocksBox from "../components/StocksBox";
import StocksSearch from "../components/StocksSearch";


function Stocks() {
  return (
    <div>
      <Navbar />
      <Invested />
      <StocksBox />
      <StocksSearch/>
      <Feedback />
      <Footer />
    </div>
  );
}

export default Stocks;
