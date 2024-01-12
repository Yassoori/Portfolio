import {Link} from 'react-router-dom'
import { X } from 'react-bootstrap-icons'

const MobileMenu = ({closeMethod}) => {
  return (
    <div className="mobile-menu-container">
      <button id='close-nav-menu' onClick={closeMethod}>
        <X />
      </button>
      <div id="mobile-nav-menu">
            <button className="mob-nav-button Home-nav-button">
              <Link to="/">Home</Link>
            </button>
            <button className="mob-nav-button ux-nav-button">
              <Link to="/ux-projects">UX</Link>
            </button>
            <button className="mob-nav-button art-nav-button">
              <Link to="/art">Art</Link>
            </button>
            <button className="mob-nav-button photo-nav-button">
              <Link to="/photography">Photography</Link>
            </button>
            <button className="mob-nav-button about-nav-button">
              <Link to="/about">About</Link>
            </button>
            <button className="mob-nav-button contact-nav-button">
              <Link to="/contact">Contact</Link>
            </button>
          </div>
    </div>
  )
}

export default MobileMenu