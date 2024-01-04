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
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  const Projects = ({ projects }) => {
    const mappedProjects = projects.map((project, index) => {
    //   function getFeaturedImage(project, index) {
    //     if (
    //       project &&
    //       project._embedded &&
    //       project._embedded["wp:featuredmedia"] &&
    //       project._embedded["wp:featuredmedia"][0].source_url
    //     ) {
    //       return project._embedded["wp:featuredmedia"][0].source_url;
    //     } else {
    //       return "https://placehold.co/600x400";
    //     }
    //   }
      return (
        <div key={project.slug + "_" + index} className="project-card">
          <Link className="project-link" to={`/ux-projects/${project.id}`}>
            {/* <img src={getFeaturedImage(project)} alt={project.title.rendered} /> */}
            {/* <img src={project._embedded["wp:featuredmedia"][0].source_url} alt={project.title.rendered} /> */}
            <h2 className="title">{project.title.rendered}</h2>
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
        <meta
          name="keywords"
          content="UX, Web Development, UX design, Web design, Portfolio"
        />
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
