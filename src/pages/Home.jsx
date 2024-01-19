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
      <div className="container" id="home-container">
        {/* <h1>Yasser Saeed</h1> */}
        <div className="home-section home-about-section">
          <Link to="/about">
            <img src="" alt="" />
            <h2>I'm Yasser Saeed</h2>
            <p>I make things</p>
          </Link>
        </div>
        <div className="home-section home-ux-section">
          <Link to="/ux-projects">
            <img src="" alt="" />
            <h3>UX and Web Projects</h3>
            <p>01011100001011</p>
          </Link>
        </div>
        <div className="home-section home-art-section">
          <Link to="/art">
            <img src="" alt="" />
            <h3>Art</h3>
            <p>I've won awards for this</p>
          </Link>
        </div>
        <div className="home-section home-photography-section">
          <Link to="/photography">
            <img src="" alt="" />
            <h3>Photography</h3>
            <p>smile!</p>
          </Link>
        </div>
        <div className="home-section home-blog-section">
          <Link to="/blog">
            <img src="" alt="" />
            <h3>Blog</h3>
            <p>My thoughts and rants</p>
          </Link>
        </div>
        <div className="home-section home-contact-section">
          <Link to="/contact">
            <img src="" alt="" />
            <h3>Contact me</h3>
            <p>
              Lets grab a coffee
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
