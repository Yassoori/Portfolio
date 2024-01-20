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
      <div className="container full-container" id="home-page">
        {/* <h1>Yasser Saeed</h1> */}
        {/* <div className="home-section home-about-section">
          <Link to="/about">
            <img src="" alt="" />
            <div className="home-section-text">
            <h2>I'm Yasser Saeed</h2>
            <p>I make things</p>
            </div>
          </Link>
        </div> */}
        <div
          className="home-section home-ux-section"
          data-aos="zoom-in"
          data-aos-offset="100"
          data-set-delay="1000"
        >
          <Link to="/ux-projects">
            <img src="/home-ux3.png" alt="" />
            <div className="home-section-text">
              <h2>Hire Me!!! I need job</h2>
              <h3>UX and Web Projects</h3>
              <p>01011100001011</p>
            </div>
          </Link>
        </div>
        <div
          className="home-section home-art-section"
          data-aos="zoom-in"
          data-aos-offset="100"
          data-set-delay="1000"
        >
          <Link to="/art">
            <img src="/home-art.jpeg" alt="" />
            <div className="home-section-text">
              <h2></h2>
              <h3>Art</h3>
              <p>I've won awards for this</p>
            </div>
          </Link>
        </div>
        <div
          className="home-section home-photography-section"
          data-aos="zoom-in"
          data-aos-offset="100"
          data-set-delay="1000"
        >
          <Link to="/photography">
            <img src="/home-photo2.jpg" alt="" />
            <div className="home-section-text">
              <h2></h2>
              <h3>Photography</h3>
              <p>smile!</p>
            </div>
          </Link>
        </div>
        {/* <div className="home-section home-blog-section">
          <Link to="/blog">
            <img src="" alt="" />
            <div className="home-section-text">
            <h3>Blog</h3>
            <p>My thoughts and rants</p>
          </Link>
        </div> */}
        <div
          className="home-section home-contact-section"
          data-aos="zoom-in"
          data-aos-offset="100"
          data-set-delay="1000"
        >
          <Link to="/contact">
            <img src="" alt="" />
            <div className="home-section-text">
              <h2></h2>
              <h3>Contact me</h3>
              <p>Lets grab a coffee</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
