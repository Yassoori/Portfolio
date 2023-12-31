import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Loading from "../components/Loading";

const aboutUrl = import.meta.env.VITE_WP_ABOUT_URL;

const About = () => {
  const [aboutPost, setAboutPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${aboutUrl}`)
      .then((res) => {
        setAboutPost(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [aboutUrl]);

  const AboutPost = ({ aboutPosts }) => {
    if (!aboutPosts) {
      return null; 
    }

    const mappedAboutPosts = aboutPosts.map((about, index) => (
      <div
        className="about-section"
        key={index}
        dangerouslySetInnerHTML={{ __html: about.content.rendered }}
      />
    ));

    return <>{mappedAboutPosts}</>;
  };

  console.log(aboutPost)

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
      <div className="container about-page double-container">
        <h2>About</h2>
        {loading ? <Loading /> : <AboutPost aboutPosts={aboutPost} />}
        {/* <div
          className="about-container double-container"
          key={index}
          dangerouslySetInnerHTML={{ __html: aboutPosts.content.rendered }}
       /> */}
      </div>
    </>
  );
}

export default About;
