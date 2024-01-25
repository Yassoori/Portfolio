import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  
if (location.pathname === "/") {
  return null;
} else {
  return (
    <div id="footer">
      <div id="social-media-icons">
        <a href="https://www.instagram.com/yassoori_photography/">
          {/* <img src="/iconinstagram.png" alt="Instagram" /> */}
          <FontAwesomeIcon icon={faInstagram} size="lg" style={{color: "#303030",}} />        
        </a>
        <a href="https://www.facebook.com/Yasser.Saeed.Artist/">
          {/* <img src="/iconfacebook.png" alt="Facebook" /> */}
          <FontAwesomeIcon icon={faFacebook} size="lg" style={{color: "#303030",}}/>
        </a>
        <a href="https://www.linkedin.com/in/yasserasaeed/">
          {/* <img src="/iconlinkedin.png" alt="LinkedIn" /> */}
          <FontAwesomeIcon icon={faLinkedin} size="lg" style={{color: "#303030",}}/>
        </a>
        <a href="https://github.com/Yassoori/">
          {/* <img src="/icongithub.png" alt="Github" /> */}
          <FontAwesomeIcon icon={faGithub} size="lg" style={{color: "#303030",}}/>
        </a>
        <a href="mailto: yasserasaeed@gmail.com">
          {/* <img src="/iconemail.png" alt="E-mail" /> */}
          <FontAwesomeIcon icon={faEnvelope} size="lg" style={{color: "#303030",}}/>
        </a>
      </div>
      <p className="contact-info">Phone: +6421 0268 1118</p>
      <p className="contact-info">© 2024 Yasser Saeed. All Rights Reserved.</p>
      {/* <p className="contact-info">© 2024</p> */}
    </div>      

  )};
};

export default Footer;
