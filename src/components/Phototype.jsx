import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const phototypeUrl = import.meta.env.VITE_WP_PHOTOGRAPHY_URL;

const phototype = () => {
  const { id } = useParams();
  // const { title } = useParams();
  const navigate = useNavigate();

  const [phototype, setPhototype] = useState(null);
  const [loading, setLoading] = useState(true);

  const endpoint = `${phototypeUrl}/${id}?_embed`;
  // const endpoint = `${phototypeUrl}/${title}?_embed`;

  useEffect(() => {
    axios
      .get(`${endpoint}`)
      .then((res) => {
        // console.log(res.data);
        setPhototype(res.data);
        const loader = setTimeout(() => setLoading(false), 1000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

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
      <Link to={"/photography/"} className="back-button-container"><button className="back-button regular-button">Back to Photography</button></Link>
    </div>
  );
};

export default phototype;
