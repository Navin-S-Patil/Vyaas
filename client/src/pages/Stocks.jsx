import React from "react";
import Navbar from "../components/Navbar";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";
import Invested from "../components/Invested";
import StocksBox from "../components/StocksBox";

function Stocks() {
  return (
    <div>
      <Navbar />
      <Invested />
      <StocksBox />
      <Feedback />
      <Footer />
    </div>
  );
}

export default Stocks;
