import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
// import { Params } from "react-router-dom";

const apiUrl = import.meta.env.VITE_WP_API_BASEURL;

const UX = () => {
  const [photoPosts, setPhotoPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${apiUrl}/photography?_embed`)
      .then((res) => {
        setPhotoPosts(res.data);
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

  const PhotoPosts = ({ photoPosts }) => {
    const mappedPhotoPosts = photoPosts.map((photoPost, index) => {
      function getFeaturedImage(photoPost, index) {
        if (
          photoPost &&
          photoPost._embedded &&
          photoPost._embedded["wp:featuredmedia"] &&
          photoPost._embedded["wp:featuredmedia"][0].source_url
        ) {
          return photoPost._embedded["wp:featuredmedia"][0].source_url;
        } else {
          return (
            <div
              className="photo-content"
              dangerouslySetInnerHTML={{ __html: photoPost.content.rendered }}
            />
          );
        }
      }
      return (
          <Link 
          key={photoPost.slug + "_" + index}
          className="photo-post-card card"
          id={`${photoPost.title.rendered}-card`}
          to={`/photography/${photoPost.id}`}
          data-aos="zoom-in"
          data-aos-offset="100"
          data-set-delay="1000">
            <img
              src={getFeaturedImage(photoPost)}
              alt={photoPost.title.rendered}
              className="card-image"
            />
            <div className="card-text">
              <div
                dangerouslySetInnerHTML={{ __html: photoPost.excerpt.rendered }}
                className="card-body"
              />
              <h2 className="card-heading">{photoPost.title.rendered}</h2>
            </div>
          </Link>
      );
    });
    return <>{mappedPhotoPosts}</>;
  };

  //   console.log(photoPosts);

  return (
    <>
      <Helmet>
        <title>Photography</title>
        <meta name="description" content="Photography Portfolio" />
        <meta
          name="keywords"
          content="Photography, Photography Studio, Photography Portfolio, Portfolio, Wedding Photographer, Wedding Photography, Wedding Photos, Wedding, Graduation Photographer, Graduation Photography, Graduation Photos, Graduation, Events Photographer, Events Photography, Events Photos"
        />
        Additional meta tags, e.g., social media share tags for Twitter, etc.
        <meta
          property="og:title"
          content="Facebook Open Graph Meta Tag example"
        />
      </Helmet>
      <div id="photo-page" className="container full-container">
        <div className="photo-card-container grid-container">
          <div
            // key={photoPost.slug + "_" + index}
            className="photo-post-card card"
            id={`Photography-card`}
          >
            <div className="photo-text">
              <h2>Photography</h2>
              <p>
                I keep my photography style casual and true to life, while
                providing my clients with a personalised photoshoot experience.
              </p>
            </div>
            <div className="book-links">
              <a
                id="contact-photo-button"
                className="book-link regular-button"
                // href="http://localhost:5173/#/contact"
                href="https://portfolio-yassoori.vercel.app/#/contact"
              >
                Book a photoshoot
              </a>
            </div>
          </div>
          {loading ? <Loading /> : <PhotoPosts photoPosts={photoPosts} />}
          {/* 
          <Link to="/photography/weddings" className="photo-card card">
            <img src="weddings-feature.png" alt="Weddings" className="card-image"/>
            <h2 className="card-heading">Weddings</h2>
            <p className="card-subheading"></p>
            <p className="card-body"></p>
          </Link>
          <Link to="/photography/graduations" className="photo-card card">
            <img src="graduations-feature.png" alt="Graduations" className="card-image"/>
            <h2 className="card-heading">Graduations</h2>
            <p className="card-subheading"></p>
            <p className="card-body"></p>
          </Link>
          <Link to="/photography/portraits" className="photo-card card">
            <img src="portraits-feature.png" alt="Portraits" className="card-image"/>
            <h2 className="card-heading">Portraits</h2>
            <p className="card-subheading"></p>
            <p className="card-body"></p>
          </Link> 
          */}
        </div>
      </div>
    </>
  );
};

export default UX;
