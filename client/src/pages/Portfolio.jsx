import React from "react";
import Navbar from "../components/Navbar";
import PortfolioInvest from "../components/PortfolioInvest";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";

function Portfolio() {
  return (
    <>
      <Navbar />
      <PortfolioInvest />
      <Feedback />
      <Footer />
    </>
  );
}

export default Portfolio;
