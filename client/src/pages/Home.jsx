import React from "react";
import Footer from "../components/Footer";
import FrontGraph from "../components/FrontGraph";
import KeepInvesting from "../components/KeepInvesting";
import Navbar from "../components/Navbar";
import OurProducts from "../components/OurProducts";

import Feedback from "../components/Feedback";

import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Navbar />
      <FrontGraph />
      <OurProducts />
      <KeepInvesting />
      <Feedback />
      <Footer />
    </motion.div>
  );
}

export default Home;
