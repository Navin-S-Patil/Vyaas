import React from "react";
import logo from "../images/logo.png";
import facebook from "../images/facebook.png";
import twitter from "../images/twitter.png";
import linkdin from "../images/linkdin.png";
import youtube from "../images/youtube.png";
import github from "../images/github.png";

function Footer() {
  return (
    <div className="Footer_bg white_text">
      <div className="Center_row mod">
        <div className="box_1">
          <img src={logo} alt="logo" className="footerVyaas"/>
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
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Services</li>
            <li>Portfolio</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="box_3">
          <h3>Terms of Use</h3>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Disclaimer</li>
            <li>Refund Policy</li>
            <li>FAQ</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
