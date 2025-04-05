import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const apiUrl = import.meta.env.VITE_WP_API_BASEURL;

const phototype = () => {
  const { id, slug } = useParams();
  // const { title } = useParams();
  const navigate = useNavigate();

  const [phototype, setPhototype] = useState(null);
  const [loading, setLoading] = useState(true);

  // const endpoint = `${apiUrl}/photography/${id}?_embed`;
  // const endpoint = `${phototypeUrl}/${title}?_embed`;
  const endpoint = `${apiUrl}/photography?slug=${encodeURIComponent(slug)}&_embed`;

  useEffect(() => {
    // console.log("Fetching phototype with slug:", slug);
    // console.log("Using endpoint:", endpoint);
    axios
      .get(`${endpoint}`)
      .then((res) => {
        // console.log(res.data);
        if (res.data && res.data.length > 0) {
          setPhototype(res.data[0]); // Note: slug query returns an array
          const loading = setTimeout(() => setLoading(false), 1000);
        } else {
          // If no project found with this slug, redirect to 404
          navigate('/404');
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [slug, navigate]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div
      key={phototype.slug}
      id="phototype-page"
      className="container full-container"
    >
      {/* <img
        src={phototype._embedded["wp:featuredmedia"][0].source_url}
        alt={phototype.title.rendered}
      /> */}
      <div
        dangerouslySetInnerHTML={{ __html: phototype.content.rendered }}
        id={phototype.title.rendered}
        className="phototype-container"
      />
      <Link to={"/photography/"} className="back-button-container">
        <button className="back-button regular-button">
          Back to Photography
        </button>
      </Link>
    </div>
  );
};

export default phototype;
