import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const apiUrl = import.meta.env.VITE_WP_API_BASEURL;

const Project = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // const endpoint = `${apiUrl}/ux/slug=${slug}&_embed`;
  const endpoint = `${apiUrl}/ux?slug=${encodeURIComponent(slug)}&_embed`;

  useEffect(() => {
    // console.log("Fetching project with slug:", slug);
    // console.log("Using endpoint:", endpoint);
    axios
      .get(`${endpoint}`)
      .then((res) => {
        // console.log(res.data);
        if (res.data && res.data.length > 0) {
          setProject(res.data[0]); // Note: slug query returns an array
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
      key={project.id}
      id="project-page"
      className="container double-container"
    >
      {/* <img
        src={project._embedded["wp:featuredmedia"][0].source_url}
        alt={project.title.rendered}
      /> */}
      <div
        dangerouslySetInnerHTML={{ __html: project.content.rendered }}
        id={project.slug}
        className="project-container"
      />
      
      <Link to={"/ux-projects/"} className="back-button-container">
        <button className="back-button regular-button">
          Back to UX Projects
        </button>
      </Link>
    </div>
  );
};

export default Project;
