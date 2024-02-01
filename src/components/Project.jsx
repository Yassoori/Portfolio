import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const apiUrl = import.meta.env.VITE_WP_API_BASEURL;

const project = () => {
  const { id } = useParams();
  // const { title } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const endpoint = `${apiUrl}/ux-projects/${id}?_embed`;
  // const endpoint = `${uxUrl}/${title}?_embed`;

  useEffect(() => {
    axios
      .get(`${endpoint}`)
      .then((res) => {
        // console.log(res.data);
        setProject(res.data);
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
      key={project.slug}
      id="project-page"
      className="container double-container"
    >
      {/* <img
        src={project._embedded["wp:featuredmedia"][0].source_url}
        alt={project.title.rendered}
      /> */}
      <div
        dangerouslySetInnerHTML={{ __html: project.content.rendered }}
        id={project.title.rendered}
        className="project-container"
      />

      <button className="back-button regular-button">
        <Link to={"/ux-projects/"} className="back-button-container">
          Back to UX Projects
        </Link>
      </button>
    </div>
  );
};

export default project;
