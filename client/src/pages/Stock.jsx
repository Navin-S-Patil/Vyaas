import React from "react";
import Footer from "../components/Footer";
import Graph from "../components/Graph";
import GraphTop from "../components/GraphTop";
import Navbar from "../components/Navbar";
import Performance from "../components/Performance";

function Stock() {
  return (
    <div>
      <Navbar />
      <GraphTop />
      <Graph />
      <Performance />
      <Footer />
    </div>
  );
}

export default Stock;
