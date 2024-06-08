import React from "react";
import logo from "../images/logo.png";
import facebook from "../images/facebook.png";
import twitter from "../images/twitter.png";
import linkdin from "../images/linkdin.png";
import youtube from "../images/youtube.png";
import github from "../images/github.png";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="Footer_bg white_text">
      <div className="Center_row mod">
        <div className="box_1">
          <img src={logo} alt="logo" className="footerVyaas" />
          <p>© 2021. All Rights Reserved.</p>
          <p className="address_box">
            6th Floor, RAIT, Building, <br />
            RAIT, D.Y.Patil Road, <br />
            Nerul, Navi Mumbai - 400706
          </p>
          <img src={facebook} alt="facebook" className="footerLogos" />
          <img src={twitter} alt="twitter" className="footerLogos" />
          <img src={linkdin} alt="linkdin" className="footerLogos" />
          <img src={youtube} alt="youtube" className="footerLogos" />
          <img src={github} alt="github" className="footerLogos" />
        </div>
        <div className="box_2">
          <h3>Quick Links</h3>
          <div className="footerLinks" >
            <Link to="/" className="linktag" >Home</Link>
            <Link to="/user" className="linktag">User</Link>
            <Link to="/stocks" className="linktag">Stocks</Link>
            <Link to="/portfolio" className="linktag">Portfolio</Link>
            <Link to="/aboutus" className="linktag">About Us</Link>
          </div>
        </div>
        <div className="box_3">
          <h3>Terms of Use</h3>
          <div className="footerLinks" >
            <Link to="/pending" className="linktag">Privacy Policy</Link>
            <Link to="/pending" className="linktag">Terms of Use</Link>
            <Link to="/pending" className="linktag">Disclaimer</Link>
            <Link to="/pending" className="linktag">Refund Policy</Link>
            <Link to="/pending" className="linktag">FAQ</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
