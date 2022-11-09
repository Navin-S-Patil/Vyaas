import React from "react";
import Navbar from "../components/Navbar";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";
import Invested from "../components/Invested";
import StocksBox from "../components/StocksBox";
import StocksSearch from "../components/StocksSearch";
import { motion } from "framer-motion";

function Stocks() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 , transition: { duration: 0.5 }}}
    >
      <Navbar />
      <Invested />
      <StocksBox />
      <StocksSearch />
      <Feedback />
      <Footer />
    </motion.div>
  );
}

export default Stocks;
