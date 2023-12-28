import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const uxUrl = import.meta.env.VITE_WC_UX_URL;

const project = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const endpoint = `${uxUrl}/${id}`;

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
  }, [endpoint]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div id="project-page" className="container double-container">
      <div className="left-container">
        <img src={project.featuredmedia} alt={project.title} />
      </div>
      <div className="right-container">
        <h2 className="title">{project.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: project.content.rendered }} />
        {/* <button>Back</button> */}
      </div>
    </div>
  );
};

export default project;
