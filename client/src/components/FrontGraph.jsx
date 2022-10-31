import React from "react";
import { Link } from "react-router-dom";
import graph from "../images/graph.png";

function FrontGraph() {
  return (
    <div className="Center_column">
      <div className="Center_row">
        <p className="front_par text_align">
          I'm Vyaas, and I'm <br/>a stock learning <br/>platform!
        </p>
        <Link to="stocks"><button className="loginRegister ">
          Lets get started &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; →
        </button></Link>
      </div>
      <img src={graph} alt="graph" className="graph" />
    </div>
  );
}

export default FrontGraph;
