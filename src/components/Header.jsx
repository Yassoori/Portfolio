import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import { Link } from "react-router-dom";
import { List } from "react-bootstrap-icons";
import axios from "axios";

const baseUrl = import.meta.env.VITE_WP_BASEURL;

const Header = () => {
    const [menuIsOpen, openMenu] = useState(false);
    const [logoUrl, setLogoUrl] = useState("");
  
useEffect(() => {
    const fetchNavLogo = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/wp-json/custom/v1/nav-logo`
        );
        if (response.status === 200) {
          const data = response.data;
          setLogoUrl(data[0]);
        } else {
          console.error("Failed to fetch logo url", error);
        }
      } catch (error) {
        console.error("Error fetching lol URL", error);
      }
    };

    fetchNavLogo();
  }, []);

  const toggleMobileMenu = () => {
    openMenu(!menuIsOpen);
    document.body.classList.toggle("no-scroll");

    // $(document).ready(function () {
    //   $("#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4").click(function () {
    //     $(this).toggleClass("open");
    //   });
    // });
  };
  return (
    <>
      <div id="topnav">
        <div id="logo">
          <Link to="/">
            <img src={logoUrl} alt="Yasser Saeed" />
          </Link>
        </div>
        {/* Desktop Menu */}
        <div className="left-nav">
          <div id="desktop-nav-menu">
            <button className="nav-button ux-nav-button">
              <Link to="/ux-projects">UX</Link>
            </button>
            <button className="nav-button art-nav-button">
              <Link to="/art">Art</Link>
            </button>
            <button className="nav-button photo-nav-button">
              <Link to="/photography">Photography</Link>
            </button>
            <button className="nav-button about-nav-button">
              <Link to="/about">About</Link>
            </button>
            <button className="nav-button contact-nav-button">
              <Link to="/contact">Contact</Link>
            </button>
          </div>
          <img src="/iconbag.png" alt="Cart" />

          {/* Hamburger on Mobile */}
          <div id="menu-container">
            {/* <div id="nav-icon3 menu-button"
              className="show-mobile-menu-button"
              onClick={toggleMobileMenu}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div> */}
            <button
              id="menu-button"
              className="show-mobile-menu-button"
              onClick={toggleMobileMenu}
            >
              <List id="hamburger-icon" />
            </button>
          </div>
        </div>
      </div>
      {menuIsOpen && <MobileMenu closeMethod={toggleMobileMenu} />}
    </>
  );
};

export default Header;