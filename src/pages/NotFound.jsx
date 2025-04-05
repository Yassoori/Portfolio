import React from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const NotFound = () => {
  return (
    <div id="notfound-page" className="container full-container">
      <div id="notfound-container">
        <div className="notfound">
          <h2>Oops, You shouldn't be here</h2>
          <p>404 error</p>
        </div>
      </div>
      {/* use this page to test loaders */}
      {/* <Loading /> */}
    </div>
  );
};

export default NotFound;
