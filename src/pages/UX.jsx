import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const apiUrl = import.meta.env.VITE_WP_API_BASEURL;

const UX = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    axios
      // .get(`${apiUrl}/ux?_embed`)
      .get(`${apiUrl}/ux?
        _embed&
        _fields=id,title,slug,excerpt,featured_media,_links,_embedded&
        _embed=wp:featuredmedia,wp:term
      `)
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [apiUrl]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  console.log(projects)
  const Projects = ({ projects }) => {
    const mappedProjects = projects.map((project, index) => {
      function getFeaturedImage(project) {
        if (
          project &&
          project._embedded &&
          project._embedded["wp:featuredmedia"] &&
          project._embedded["wp:featuredmedia"][0].source_url
        ) {
          return project._embedded["wp:featuredmedia"][0].source_url;
        } else {
          return null;
        }
      }
      function getTags(project) {
        if (
          project &&
          project._embedded &&
          project._embedded["wp:term"]
        ) {
          const allTerms = project._embedded["wp:term"];
          for (let termsArray of allTerms) {
            if (termsArray.length && termsArray[0].taxonomy === "post_tag") {
              return termsArray;
            }
          }
          return [];
        } else {
          return null;
        }
      }
      const tags = getTags(project);

      return (
        <Link
          key={project.slug + "_" + index}
          id={`${project.slug}-card`}
          className="project-card card"
          // to={project.slug ? `/ux-projects/${project.slug}` : `/ux-projects/${project.id}`}
          to={`/ux-projects/${project.slug}`}
          data-aos="zoom-in"
          data-aos-offset="100"
          data-set-delay="1000"
        >
          <img
            src={getFeaturedImage(project)}
            alt={project.title.rendered}
            className="card-image"
          />
          <div className="card-text">
            <div
              dangerouslySetInnerHTML={{ __html: project.excerpt.rendered }}
              className="card-body"
            />
            <div className="card-heading-with-tags">
              <h2 className="card-heading">{project.title.rendered}</h2>
              <p className="tags">
                {tags.map((tag) => (
                  <span key={tag.id} className="tag">
                    {tag.name}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </Link>
      );
    });
    return <>{mappedProjects}</>;
  };

  // console.log(projects);

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
      <div className="container full-container" id="ux-page">
        <div className="project-card-container grid-container">
          {loading ? <Loading /> : <Projects projects={projects} />}
          {/* test */}
          {/* <Link
            to="/ux-projects/273"
            className="project-card card"
            id="burger-card"
            data-aos="zoom-in"
            data-aos-offset="100"
            data-set-delay="1000"
          >
            <img
              src="images/ux/realburger-feature4.png"
              alt="Real Burger"
              className="card-image"
              id="images/ux/burger-ux-image"
            />
            <div className="card-text">
              <h3 className="card-body">
                Redesign for a local restaurant's ordering app.
              </h3>
              <div className="">
                <h2 className="card-heading">Real Burger</h2>
                <p className="card-subheading">CSS | SASS | Figma</p>
              </div>
            </div>
          </Link> */}
          {/* <Link
            to="/ux-projects/346"
            className="project-card card"
            id="aurea-card"
            data-aos="zoom-in"
            data-aos-offset="100"
            data-set-delay="1000"
          >
            <img src="images/ux/aurea-feature.png" alt="Aurea" className="card-image" id="aurea-ux-image"/>
            <div className="card-text">
              <h3 className="card-body">
                Team project for a jewellery E-commerce site.
              </h3>
              <div className="">
                <h2 className="card-heading">Aurea</h2>
                <p className="card-subheading">
                  MongoDB | React | Node
                </p>
              </div>
            </div>
          </Link> */}
          {/* <Link
            to="/ux-projects/406"
            className="project-card card"
            id="pokedex-card"
            data-aos="zoom-in"
            data-aos-offset="100"
            data-set-delay="1000"
          >
            <img
              src="images/ux/pokedex-feature4.png"
              alt="Pokédex"
              className="card-image"
              id="pokedex-ux-image"
            />
            <div className="card-text">
              <h3 className="card-body">
                A simple Pokémon index App using the free PokéAPI.
              </h3>
              <div className="">
                <h2 className="card-heading">Pokédex</h2>
                <p className="card-subheading">API | React | Node</p>
              </div>
            </div>
          </Link> */}
          {/* <Link
            to="/ux-projects/364"
            className="project-card card"
            id="regan-card"
            data-aos="zoom-in"
            data-aos-offset="100"
            data-set-delay="1000"
          >
            <img
              src="images/ux/regan-feature3.png"
              alt="Regan Hill-Male"
              className="card-image"
              id="regan-ux-image"
            />
            <div className="card-text">
              <h3 className="card-body">
                Artist's online portfolio and shop to boost commissions.
              </h3>
              <div className="">
                <h2 className="card-heading">Regan Hill-Male</h2>
                <p className="card-subheading">
                  Wordpress | React | Node | PHP
                </p>
              </div>
            </div>
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default UX;
