import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Loading from "../components/Loading";

const apiUrl = import.meta.env.VITE_WP_API_BASEURL;

const About = () => {
  const [aboutPost, setAboutPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${apiUrl}/about-post`)
      .then((res) => {
        setAboutPost(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [apiUrl]);

  const AboutPost = ({ aboutPosts }) => {
    if (!aboutPosts) {
      return null;
    }

    const mappedAboutPosts = aboutPosts.map((about, index) => (
      <div
        className="about-section grid-container"
        id={about.title.rendered}
        key={index}
        dangerouslySetInnerHTML={{ __html: about.content.rendered }}
      />
    ));

    return <>{mappedAboutPosts}</>;
  };

  // console.log(aboutPost);

  return (
    <>
      <Helmet>
        <title>About</title>
        <meta name="description" content="This is the about post" />
        <meta name="keywords" content="about, artist biography, exhibitions" />
        Additional meta tags, e.g., social media share tags for Twitter, etc.
        <meta
          property="og:title"
          content="Facebook Open Graph Meta Tag example"
        />
      </Helmet>
      <div id="about-page" className="container double-container">
        {/* <h2>About</h2> */}
        <div className="about-grid grid-container">
        {loading ? <Loading /> : <AboutPost aboutPosts={aboutPost} />}
        </div>
      </div>
    </>
  );
};

export default About;
