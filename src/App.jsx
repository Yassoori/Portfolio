import React, { useEffect, useState } from "react";
import { HashRouter } from "react-router-dom";
import "./css/App.css";
import useCustomizer from "./hooks/useCustomizer.jsx";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Links from "./Links";

function App() {
  const {
    bgColor,
    headingFont,
    bodyFont,
    fontColor,
  } = useCustomizer();

  useEffect(() => {
    const applyStyles = async () => {

      const styles = document.getElementById("dynamicStyles");
      styles.innerHTML = `h3, p, li, a, input, textarea { font-family: ${bodyFont}, sans-serif; } 
      h2, button { font-family: ${headingFont}, serif; }
      body { background: #${bgColor}; color: ${fontColor}}
      a, button, .inquire { color: ${fontColor}}`
    };

    applyStyles();

  }, [bgColor, headingFont, bodyFont, fontColor]);

  console.log(bgColor, headingFont, bodyFont, fontColor);

  return (
    <>
      <HashRouter>
        <Header />
        <Links />
        <Footer />
      </HashRouter>
    </>
  );
}

export default App;