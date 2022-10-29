import React from "react";
import Footer from "../components/Footer";
import FrontGraph from "../components/FrontGraph";
import KeepInvesting from "../components/KeepInvesting";
import Navbar from "../components/Navbar";
import OurProducts from "../components/OurProducts";

import Feedback from "../components/Feedback";

function Home() {
  return (
    <div>
      <Navbar />
      <FrontGraph/>
      <OurProducts/>
      <KeepInvesting/>
      <Footer/>
      {/* <Feedback /> */}
    </div>
  );
}

export default Home;
