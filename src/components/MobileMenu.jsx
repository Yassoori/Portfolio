import {Link} from 'react-router-dom'
import { X } from 'react-bootstrap-icons'

const MobileMenu = ({closeMethod}) => {
  const handleNavClick = () => {
    closeMethod(); // Close the mobile menu when a navigation button is clicked
  };

  return (
    <div id="mobile-menu-container">
      <button id='close-nav-menu' onClick={closeMethod}>
        <X />
      </button>
      <div id="mobile-nav-menu">
        <button className="mob-nav-button Home-nav-button" onClick={handleNavClick}>
          <Link to="/">Home</Link>
        </button>
        <button className="mob-nav-button ux-nav-button" onClick={handleNavClick}>
          <Link to="/ux-projects">UX</Link>
        </button>
        <button className="mob-nav-button art-nav-button" onClick={handleNavClick}>
          <Link to="/art">Art</Link>
        </button>
        <button className="mob-nav-button photo-nav-button" onClick={handleNavClick}>
          <Link to="/photography">Photography</Link>
        </button>
        <button className="mob-nav-button about-nav-button" onClick={handleNavClick}>
          <Link to="/about">About</Link>
        </button>
        <button className="mob-nav-button contact-nav-button" onClick={handleNavClick}>
          <Link to="/contact">Contact</Link>
        </button>
          </div>
    </div>
  )
}

export default MobileMenu