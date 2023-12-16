import React from "react";

const Footer = () => {
  return (
    <div id="footer">
      <div id="social-media-icons">
        <a href="https://www.instagram.com/yassoori_photography/">
          <img src="/iconinstagram.png" alt="Instagram" />
        </a>
        <a href="https://www.facebook.com/Yasser.Saeed.Artist/">
          <img src="/iconfacebook.png" alt="Facebook" />
        </a>
        <a href="https://www.linkedin.com/in/yasserasaeed/">
          <img src="/iconlinkedin.png" alt="LinkedIn" />
        </a>
        <a href="https://github.com/Yassoori/">
          <img src="/icongithub.png" alt="Github" />
        </a>
        <a href="mailto: yasserasaeed@gmail.com">
          <img src="/iconemail.png" alt="E-mail" />
        </a>
      </div>
      <p className="contact-info">Phone: +6421 0268 1118</p>
      <p className="contact-info">© 2023 Yasser Saeed. All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
