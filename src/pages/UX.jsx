import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const uxUrl = import.meta.env.VITE_WP_UX_URL;

const UX = () => {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${uxUrl}`)
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [uxUrl]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  const Projects = ({ projects }) => {
    const mappedProjects = projects.map((project, index) => {
        if (!project) {
            return (
              <div className="no-projects">
                <h2>
                  Oops, something went wrong. I can't find the projects at the moment.
                </h2>
                <img src="no-projects-image.png" alt="" />
              </div>
            );
          }
      return (
        <div key={project.slug + "_" + index} className="project-card">
          <Link className="project-link" to={`/project/${project.id}`}>
            <h2 className="title">{project.title.rendered}</h2>
            {/* <div
              className="short-description"
              dangerouslySetInnerHTML={{ __html: project.content.rendered }}
            /> */}
            {/* <img src={project.images[0].src} alt={project.name} /> */}
          </Link>
        </div>
      );
    });
    return <>{mappedProjects}</>;
  };

//   console.log(projects);

  return (
    <>
      <Helmet>
        <title>About</title>
        <meta name="description" content="This is the UX page" />
        <meta name="keywords" content="UX, Web Development, UX design, Web design, Portfolio" />
        Additional meta tags, e.g., social media share tags for Twitter, etc.
        <meta
          property="og:title"
          content="Facebook Open Graph Meta Tag example"
        />
      </Helmet>
      <div className="container full-container">
        <div className="project-card-container">
          {loading ? <Loading /> : <Projects projects={projects} />}
        </div>
      </div>
    </>
  );
};

export default UX;
