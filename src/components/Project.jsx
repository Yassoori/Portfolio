import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const uxUrl = import.meta.env.VITE_WP_UX_URL;

const project = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const endpoint = `${uxUrl}/${id}?_embed`;

  useEffect(() => {
    axios
      .get(`${endpoint}`)
      .then((res) => {
        console.log(res.data);
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
      className="container full-container"
    >
      <img src={project._embedded["wp:featuredmedia"][0].source_url} alt={project.title.rendered} />
      <div
        dangerouslySetInnerHTML={{ __html: project.content.rendered }}
        className="project-container"
      />
      <button>Back</button>
    </div>
  );
};

export default project;
