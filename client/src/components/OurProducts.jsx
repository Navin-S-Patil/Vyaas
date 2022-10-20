import React from "react";
import logos from "../images/Vyaas_logo.png";
import laptop from "../images/laptop.png";
import text from "../images/Group1.png";

function OurProducts() {
  return (
    <div className="ourProducts column">
      <h1 className="headingOurProducts">Our Products</h1>
      <p className="front_par" style={{ fontSize: "3.5rem" }}>
        Learn without risking Your Money
      </p>
      <div className="Center_row_mid">
        <img src={logos} alt="logo" className="logo" />
        <p className="paragraph">Vyaas paper trading stocks</p>
      </div>

      <div className="Center_row">
        <img src={laptop} id="laptop" alt="laptop" className="laptop" />

        <div className="column">
          {/* <div className="ZeroText Center_row">
            <h1 className="zero">Zero</h1>
            <p className="accountOpening">&nbsp;&nbsp;account charges</p>
          </div>
          <p className="smallText">
            You don’t have to pay a single ruppes for Vyaas Learning stock
            market with fun
          </p> */}
          <img src={text} alt="text" className="text" />
          <button className="loginRegister create">Create account now</button>
        </div>
      </div>
    </div>
  );
}

export default OurProducts;
