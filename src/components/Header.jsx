import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import { Link, useLocation } from "react-router-dom";
import { List } from "react-bootstrap-icons";
import axios from "axios";
// import { Divide as Hamburger } from 'hamburger-react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

const baseUrl = import.meta.env.VITE_WP_BASEURL;

const Header = () => {
  const [menuIsOpen, openMenu] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [activeNavItem, setActiveNavItem] = useState("");
  const location = useLocation();

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

  const closeMobileMenu = () => {
    openMenu(false);
    document.body.classList.remove("no-scroll");
  };

  const handleWindowResize = () => {
    if (window.innerWidth > 660) {
      closeMobileMenu();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    openMenu(!menuIsOpen);
    document.body.classList.toggle("no-scroll");
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  useEffect(() => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    const baseRoute =
      pathParts[0] === "product" ? "art" : pathParts[0] || "home";
    setActiveNavItem(baseRoute);
  }, [location.pathname]);

  const handleNavClick = (navItem) => {
    setActiveNavItem(navItem);
    // toggleMobileMenu();
  };

  return (
    <>
      {activeNavItem !== "home" && (
        <nav>
          <div id="logo">
            <Link
              to="/"
              className={`nav-button photo-nav-button ${
                activeNavItem === "home" ? "active" : ""
              }`}
              // onClick={() => handleNavClick("home")}
            >
              {/* <img src={logoUrl} alt="Yasser Saeed" className="logo-image"/> */}
              <h4 className="logo-text">YASSER SAEED</h4>
              {/* <h4 className="logo-text">Yasser Saeed</h4> */}
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className="left-nav">
            <div id="desktop-nav-menu">
              <Link
                to="/ux-projects"
                className={`nav-button ux-nav-button ${
                  activeNavItem === "ux-projects" ? "active" : ""
                }`}
                onClick={() => handleNavClick("ux-projects")}
              >
                UX
              </Link>

              <Link
                to="/art"
                className={`nav-button art-nav-button ${
                  activeNavItem === "art" ? "active" : ""
                }`}
                onClick={() => handleNavClick("art")}
              >
                Art
              </Link>

              <Link
                to="/photography"
                className={`nav-button photo-nav-button ${
                  activeNavItem === "photography" ? "active" : ""
                }`}
                onClick={() => handleNavClick("photography")}
              >
                Photography
              </Link>

              <Link
                to="/about"
                className={`nav-button about-nav-button ${
                  activeNavItem === "about" ? "active" : ""
                }`}
                onClick={() => handleNavClick("about")}
              >
                About
              </Link>

              <Link
                to="/contact"
                // to="/about#contact"
                className={`nav-button contact-nav-button ${
                  activeNavItem === "contact" ? "active" : ""
                }`}
                onClick={() => handleNavClick("contact")}
              >
                Contact
              </Link>
            </div>
            {/* <img src="/iconbag.png" alt="Cart" id="cart"/> */}
            {/* <FontAwesomeIcon
            icon={faBagShopping}
            size="lg"
            style={{ color: "#303030" }}
            id="cart"
          /> */}
            {/* Hamburger on Mobile */}
            <div id="hamburger-container">
              {/* <div
                id="nav-icon3"
                className="show-mobile-menu-button"
                onClick={toggleMobileMenu}
              >
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
        </nav>
      )}
      <MobileMenu closeMethod={toggleMobileMenu} isOpen={menuIsOpen} />
    </>
  );
};

export default Header;
