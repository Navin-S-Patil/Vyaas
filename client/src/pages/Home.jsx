import React from "react";
import Footer from "../components/Footer";
import FrontGraph from "../components/FrontGraph";
import KeepInvesting from "../components/KeepInvesting";
import Navbar from "../components/Navbar";
import OurProducts from "../components/OurProducts";

function Home() {
  return (
    <div>
      <Navbar />
      <FrontGraph/>
      <OurProducts/>
      <KeepInvesting/>
      <Footer/>
    </div>
  );
}

export default Home;
