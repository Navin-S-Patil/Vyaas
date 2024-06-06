import React from "react";
import { Link } from "react-router-dom";
import graph from "../images/graph.png";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function FrontGraph() {
  const isloading = useSelector((state) => state.stock.isloading);

  return (
    <div className="Center_column">
      <div className="Center_row">
        <p className="front_par text_align">
          I'm Vyaas, and I'm <br />a stock learning <br />
          platform!
        </p>
        {isloading ? (
          <button className="loginRegister loginButton" onClick={()=> toast.info("The Information is Loading")}>
            Lets get started &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; →
          </button>
        ) : (
          <Link to="stocks">
            <button className="loginRegister loginButton ">
              Lets get started &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; →
            </button>
          </Link>
        )}
      </div>
      <img src={graph} alt="graph" className="graph" />
    </div>
  );
}

export default FrontGraph;
