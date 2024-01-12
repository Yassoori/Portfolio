import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const UXUrl = import.meta.env.VITE_WP_UX_URL;

const UX = () => {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${UXUrl}`)
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
            <img src={`${project.title.rendered}-feature.png`} alt={project.title.rendered} className="card-image"/>
            <h2 className="title">{project.title.rendered}</h2>
            <p></p>
            <p></p>
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
        <title>UX</title>
        <meta name="description" content="This is the UX Portfolio" />
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
          <Link to="/ux-projects/273" className="project-card project-link">
            <img src="realburger-feature.png" alt="Real Burger" className="card-image"/>
            <h2 className="card-heading">Real Burger</h2>
            <p className="card-subheading">SASS</p>
            <p className="card-body">Redesign for a local restaurants ordering app.</p>
          </Link>
          <Link to="/ux-projects/aurea" className="project-card project-link">
            <img src="aurea-feature.png" alt="Aurea" className="card-image"/>
            <h2 className="card-heading">Aurea</h2>
            <p className="card-subheading">Full Stack / React JS / Agile development</p>
            <p className="card-body">E-Commerce site</p>
          </Link>
          <Link to="/ux-projects/pokedex" className="project-card project-link">
            <img src="pokedex-feature.png" alt="Pokédex" className="card-image"/>
            <h2 className="card-heading">Pokédex</h2>
            <p className="card-subheading">React JS / Node JS</p>
            <p className="card-body">Redesign for a local restaurants ordering app.</p>
          </Link>
          <Link to="/ux-projects/regan-hill-male" className="project-card project-link">
            <img src="regan-hill-male-feature.png" alt="Regan Hill-Male" className="card-image"/>
            <h2 className="card-heading">Regan Hill-Male</h2>
            <p className="card-subheading">Wordpress / React JS</p>
            <p className="card-body">Redesign for a local restaurants ordering app.</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UX;
