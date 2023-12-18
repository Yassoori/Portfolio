import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Loading from "../components/Loading";

const aboutUrl = import.meta.env.VITE_WP_ABOUT_URL;

const About = () => {
  const [aboutPage, setAboutPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${aboutUrl}`)
      .then((res) => {
        setAboutPage(res.data);
        setLoading(false);
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  const AboutPage = ({ abouts }) => {
    if (!abouts || !abouts.map) {
      return null; 
    }

    const mappedAboutPages = abouts.map((about, index) => (
      <div
        className="about-container double-container"
        key={index}
        dangerouslySetInnerHTML={{ __html: about.content.rendered }}
      />
    ));

    return <>{mappedAboutPages}</>;
  };

  return (
    <>
      <Helmet>
        <title>About</title>
        <meta name="description" content="This is the about page" />
        <meta name="keywords" content="about, artist biography, exhibitions" />
        {/* Additional meta tags, e.g., social media share tags for Twitter, etc. */}
        <meta
          property="og:title"
          content="Facebook Open Graph Meta Tag example"
        />
      </Helmet>
      <div className="container">
      {/* <AboutPage abouts={aboutPage} /> */}
        {loading ? <Loading /> : <AboutPage abouts={aboutPage} />}
      </div>
    </>
  );
}

export default About;
