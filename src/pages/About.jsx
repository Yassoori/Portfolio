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
        <title>About Yasser Saeed</title>
        <meta
          name="description"
          content="Learn about Yasser Saeed, a UX designer and web developer, artist, and photographer."
        />
        <meta property="og:title" content="About Yasser Saeed" />
        <meta
          property="og:description"
          content="Learn about Yasser Saeed, a UX designer and web developer, artist, and photographer."
        />
        <meta property="og:type" content="profile" />
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
