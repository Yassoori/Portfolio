import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import getWordPressImageProps from "../utils/getWordPressImageProps";

const apiUrl = import.meta.env.VITE_WP_API_BASEURL;

const Home = () => {
  const [mainPosts, setMainPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${apiUrl}/main?_embed`)
      .then((res) => {
        setMainPosts(res.data);
        setLoading(false);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [apiUrl]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  const MainPosts = ({ mainPosts }) => {
    const mappedMainPosts = mainPosts.map((mainPost, index) => {
      const imageProps = getWordPressImageProps(
        mainPost,
        "(min-width: 992px) 30vw, (min-width: 812px) 45vw, 90vw",
        600
      );

      return (
        <div 
          key={mainPost.slug}
          className={`home-card card home-${mainPost.slug}-section`}
          data-aos="zoom-in"
          data-aos-offset="100"
          data-set-delay="1000"
        >
          <Link
            to={`/${mainPost.slug}`}
          >
            {imageProps && (
              <img
                {...imageProps}
                alt={mainPost.title.rendered}
                id={`${mainPost.slug}-home-image`}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
              />
            )}
            <div className="card-text">
              <div
                dangerouslySetInnerHTML={{ __html: mainPost.excerpt.rendered }}
                className="card-body"
              />
              <h2 className="card-heading">{mainPost.title.rendered}</h2>
            </div>
          </Link>
        </div>
      );
    });
    return <>{mappedMainPosts}</>;
  };

  return (
    <>
      <Helmet>
        <title>Yasser Saeed | UX, Art &amp; Photography</title>
        <meta
          name="description"
          content="Explore the portfolio of Yasser Saeed, featuring UX design, web development, artwork, and photography."
        />
        <meta
          property="og:title"
          content="Yasser Saeed | UX, Art &amp; Photography"
        />
        <meta
          property="og:description"
          content="Explore the portfolio of Yasser Saeed, featuring UX design, web development, artwork, and photography."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="container full-container grid-container" id="home-page">
        {/* {loading ? <Loading /> : <MainPosts mainPosts={mainPosts} />} */}
        <MainPosts mainPosts={mainPosts} />
        {/* <div
          className="home-card card home-ux-section"
          data-aos="zoom-in"
          data-aos-offset="100"
          data-set-delay="1000"
        >
          <Link to="/ux-projects">
            <img src="images/home/home-ux3.png" alt="" id="ux-home-image" />
            <div className="card-text">
              <h3>UX Design and Web Development Portfolio</h3>
              <h2>UX</h2>
              <p>01011100001011</p>
            </div>
          </Link>
        </div>
        <div
          className="home-card card home-art-section"
          data-aos="zoom-in"
          data-aos-offset="100"
          data-set-delay="1000"
        >
          <Link to="/art">
            <img src="images/home/home-art.jpeg" alt="" id="art-home-image" />
            <div className="card-text">
              <h3>Paintings, Digital Prints, Abstract Photography</h3>
              <h2>Art</h2>
              <p>I've won awards for this</p>
            </div>
          </Link>
        </div>
        <div
          className="home-card card home-photography-section"
          data-aos="zoom-in"
          data-aos-offset="100"
          data-set-delay="1000"
        >
          <Link to="/photography">
            <img src="images/home/IMG_9309.jpg" alt="" id="photo-home-image" />
            <div className="card-text">
              <h3>Weddings, Graduations and other Celebrations</h3>
              <h2>Photography</h2>
              <p>smile!</p>
            </div>
          </Link>
        </div> */}
        <div
          className="home-card card home-contact-section"
          data-aos="zoom-in"
          data-aos-offset="100"
          data-set-delay="1000"
        >
          <div className="card-text">
            {/* <h1 className="greeting">
                Hi, I’m Yasser – UX developer, artist and photographer.
              </h1> */}
            <h1 className="greeting">
              HI, I'M YASSER - UX DEVELOPER, ARTIST AND PHOTOGRAPHER.
            </h1>
            <button id="contact-home-button" className="regular-button">
              <Link to="/contact">Get in touch</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
