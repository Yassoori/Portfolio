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
        <div className="home-container container">
            <h1>Yasser Saeed</h1>
            <div className="home-section home-about-section">
            <Link to="/about">
                <h2>My name is Yasser Saeed, and I make things</h2>
                <p></p>
                <img src="" alt="" />
            </Link>
            </div>
            <div className="home-section home-contact-section">
            <Link to="/contact">
                <h3>Contact me</h3>
                <p>
                Want a painting made? Or do you need a photographer for a special
                occasion?
                </p>
                <img src="" alt="" />
            </Link>
            </div>
            <div className="home-section home-ux-section">
            <Link to="/ux">
                <h3>UX and Web Projects</h3>
                <p>01011100001011</p>
                <img src="" alt="" />
            </Link>
            </div>
            <div className="home-section home-art-section">
            <Link to="/art">
                <h3>Art Gallery and Shop</h3>
                <p>I've won awards for this</p>
                <img src="" alt="" />
            </Link>
            </div>
            <div className="home-section home-photography-section">
            <Link to="/photography">
                <h3>Photography Gallery</h3>
                <p>smile!</p>
                <img src="" alt="" />
            </Link>
            </div>
            <div className="home-section home-blog-section">
            <Link to="/blog">
                <h3>Blog</h3>
                <p>The Future, the Past, and the Rants</p>
                <img src="" alt="" />
            </Link>
            </div>
        </div>
    </>
  );
};

export default Home;
