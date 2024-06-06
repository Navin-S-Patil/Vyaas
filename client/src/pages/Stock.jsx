import React from "react";
import Footer from "../components/Footer";
// import Graph from "../components/Graph";
import GraphTop from "../components/GraphTop";
import Navbar from "../components/Navbar";
import Performance from "../components/Performance";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import WrokignGraph from "../components/WrokignGraph";

function Stock() {

  const location = useLocation();
  const stockName = location.pathname.split("/")[2];

  const stock = useSelector((state) => state.stock.stocks);
  const symbol = stock.get(stockName)[0].symbol;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 ,transition: { duration: 0.5 }}}
    >
      <Navbar />
      <GraphTop symbol={symbol}/>
      <WrokignGraph  symbol={symbol}/>
      <Performance symbol={symbol} />
      <Footer />
    </motion.div>
  );
}

export default Stock;
