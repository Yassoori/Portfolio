import { useState, useEffect } from "react";
// import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
// import Loading from "../components/Loading";

const baseUrl = import.meta.env.VITE_WP_BASEURL;

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="This is the home page" />
        <meta name="keywords" content="keyword1, keyword2, keyword3" />
        <meta
          property="og:title"
          content="Facebook Open Graph Meta Tag example"
        />
      </Helmet>
      <div className="container full-container grid-container" id="home-page">
        {/* <h1>Yasser Saeed</h1> */}
        {/* <div className="home-card card home-about-section">
          <Link to="/about">
            <img src="" alt="" />
            <div className="card-text">
            <h2>I'm Yasser Saeed</h2>
            <p>I make things</p>
            </div>
          </Link>
        </div> */}
        <div
          className="home-card card home-ux-section"
          data-aos="zoom-in"
          data-aos-offset="100"
          data-set-delay="1000"
        >
          <Link to="/ux-projects">
            <img src="/home-ux3.png" alt="" id="ux-home-image"/>
            <div className="card-text">
              <h3>UX Design and Web Development Portfolio</h3>
              <h2>UX</h2>
              {/* <p>01011100001011</p> */}
            </div>
          </Link>
        </div>
        <div
          className="home-card card home-art-section"
          data-aos="zoom-in"
          data-aos-offset="100"
          data-set-delay="1000"
        >
          <Link to="/art">
            <img src="/home-art.jpeg" alt=""  id="art-home-image"/>
            <div className="card-text">
              <h3>Paintings, Digital Prints, Abstract Photography</h3>
              <h2>Art</h2>
              {/* <p>I've won awards for this</p> */}
            </div>
          </Link>
        </div>
        <div
          className="home-card card home-photography-section"
          data-aos="zoom-in"
          data-aos-offset="100"
          data-set-delay="1000"
        >
          <Link to="/photography">
            <img src="/IMG_9309.jpg" alt=""  id="photo-home-image"/>
            <div className="card-text">
              <h3>Weddings, Graduations and other Celebrations</h3>
              <h2>Photography</h2>
              {/* <p>smile!</p> */}
            </div>
          </Link>
        </div>
        {/* <div className="home-card card home-blog-section">
          <Link to="/blog">
            <img src="" alt="" />
            <div className="card-text">
            <h3>My thoughts and rants</h3>
            <h2>Blog</h2>
          </Link>
        </div> */}
        <div
          className="home-card card home-contact-section"
          data-aos="zoom-in"
          data-aos-offset="100"
          data-set-delay="1000"
        >
          
          {/* <Link to="/contact"> */}
            {/* <img src="" alt="" /> */}
            <div className="card-text">
              {/* <h3></h3> */}
              {/* <h2>Contact me</h2> */}
              {/* <h1 className="greeting">
                Hi, I’m Yasser – UX developer, artist and photographer.
              </h1> */}
              <h1 className="greeting">
                HI, I'M YASSER - UX DEVELOPER, ARTIST AND PHOTOGRAPHER.
              </h1>
              <Link to="/contact">
                <button id="contact-home-button" className="regular-button">
                  Get in touch
                </button>
              </Link>
            </div>
          {/* </Link> */}
          
        </div>
      </div>
    </>
  );
};

export default Home;
