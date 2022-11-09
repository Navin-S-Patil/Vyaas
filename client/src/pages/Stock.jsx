import React from "react";
import Footer from "../components/Footer";
import Graph from "../components/Graph";
import GraphTop from "../components/GraphTop";
import Navbar from "../components/Navbar";
import Performance from "../components/Performance";
import { motion } from "framer-motion";

function Stock() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 ,transition: { duration: 0.5 }}}
    >
      <Navbar />
      <GraphTop />
      <Graph />
      <Performance />
      <Footer />
    </motion.div>
  );
}

export default Stock;
