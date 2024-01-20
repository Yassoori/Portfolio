import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const PhotoURL = import.meta.env.VITE_WP_UX_URL;

const UX = () => {
  const [photoTypes, setPhotoTypes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${PhotoURL}`)
      .then((res) => {
        setPhotoTypes(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  const PhotoTypes = ({ photoTypes }) => {
    const mappedPhotoTypes = photoTypes.map((photoType, index) => {
      //   function getFeaturedImage(photoType, index) {
      //     if (
      //       photoType &&
      //       photoType._embedded &&
      //       photoType._embedded["wp:featuredmedia"] &&
      //       photoType._embedded["wp:featuredmedia"][0].source_url
      //     ) {
      //       return photoType._embedded["wp:featuredmedia"][0].source_url;
      //     } else {
      //       return "https://placehold.co/600x400";
      //     }
      //   }
      return (
        <div key={photoType.slug + "_" + index} className="photoType-card">
          <Link className="photo-type-link" to={`/ux-photo-types/${photoType.id}`}>
            {/* <img src={getFeaturedImage(photoType)} alt={photoType.title.rendered} /> */}
            {/* <img src={photoType._embedded["wp:featuredmedia"][0].source_url} alt={photoType.title.rendered} /> */}
            <img src={`${photoTypes.title.rendered}-feature.png`} alt={photoTypes.title.rendered} className="card-image"/>
            <h2 className="title">{photoTypes.title.rendered}</h2>
            <p></p>
            <p></p>
          </Link>
        </div>
      );
    });
    return <>{mappedPhotoTypes}</>;
  };

  //   console.log(projects);

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
        <div className="photo-card-container">
          {/* {loading ? <Loading /> : <PhotoTypes photoTypes={photoTypes} />} */}
          <Link to="/photography/weddings" className="photo-card">
            <img src="weddings-feature.png" alt="Weddings" className="card-image"/>
            <h2 className="card-heading">Weddings</h2>
            <p className="card-subheading"></p>
            <p className="card-body"></p>
          </Link>
          <Link to="/photography/graduations" className="photo-card">
            <img src="graduations-feature.png" alt="Graduations" className="card-image"/>
            <h2 className="card-heading">Graduations</h2>
            <p className="card-subheading"></p>
            <p className="card-body"></p>
          </Link>
          <Link to="/photography/events" className="photo-card">
            <img src="events-feature.png" alt="Events" className="card-image"/>
            <h2 className="card-heading">Events</h2>
            <p className="card-subheading"></p>
            <p className="card-body"></p>
          </Link>
          <Link to="/photography/portraits" className="photo-card">
            <img src="portraits-feature.png" alt="Portraits" className="card-image"/>
            <h2 className="card-heading">Portraits</h2>
            <p className="card-subheading"></p>
            <p className="card-body"></p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UX;
