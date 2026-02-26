import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Error page</title>
        <meta name="description" content="This is the 404 Error page" />
        <meta name="keywords" content="" />
        <meta
          property="og:title"
          content="Facebook Open Graph Meta Tag example"
        />
      </Helmet>
      <div id="notfound-page" className="container full-container">
        <div id="notfound-container">
          <div className="notfound">
            <h2>404 error</h2>
            <p>Oops, You shouldn't be here</p>
            <Link to={".."} className="back-button-container">
              <button className="back-button regular-button">
                Home
              </button>
            </Link>
          </div>
        </div>
        {/* use this page to test loaders */}
        {/* <Loading /> */}
      </div>
    </>
  );
};

export default NotFound;
