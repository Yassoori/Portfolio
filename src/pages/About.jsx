import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Loading from "../components/Loading";
import Contact from "./Contact";

const aboutUrl = import.meta.env.VITE_WP_ABOUT_URL;

const About = () => {
  const [aboutPost, setAboutPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${aboutUrl}`)
      .then((res) => {
        setAboutPost(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [aboutUrl]);

  const AboutPost = ({ aboutPosts }) => {
    if (!aboutPosts) {
      return null;
    }

    const mappedAboutPosts = aboutPosts.map((about, index) => (
      <div
        id="about-page"
        className="container double-container about-section"
        key={index}
        dangerouslySetInnerHTML={{ __html: about.content.rendered }}
      />
    ));

    return <>{mappedAboutPosts}</>;
  };

  // console.log(aboutPost);

  return (
    <>
      <Helmet>
        <title>About</title>
        <meta name="description" content="This is the about post" />
        <meta name="keywords" content="about, artist biography, exhibitions" />
        Additional meta tags, e.g., social media share tags for Twitter, etc.
        <meta
          property="og:title"
          content="Facebook Open Graph Meta Tag example"
        />
      </Helmet>
      <div id="about-page" className="container double-container">
        {/* <h2>About</h2> */}
        {/* {loading ? <Loading /> : <AboutPost aboutPosts={aboutPost} />} */}
        {/* <div
          className="about-container double-container"
          key={index}
          dangerouslySetInnerHTML={{ __html: aboutPosts.content.rendered }}
        /> */}
        <h2>Kia Ora, I'm Yasser</h2>
        <div className="left-container">
          <img src="/about.jpg" alt="" id="about-photo" />
        </div>
        <div className="right-container">
          <p id="about-main">
            I’m a UX designer, an artist and photographer based in Auckland, New
            Zealand. I hold a diploma in UX and Web Design (Level 6) from the
            Yoobee College of Creative Innovation.
            <br />
            <br />
            I am currently available for front end, back end, and full stack
            development or UI and UX design. I enjoy coding and find it
            fulfilling to work on the technical side of things. I have a deep
            passion for the arts and experience in the field, and love to bring
            my creative skills to web development.
            <br />
            <br />I am also a multidisciplinary artist and photographer whose
            practice stems from personal interests, experiences and research in
            architecture, history, and typography. In addition to my personal
            practice, I often make art in service of social causes and community
            projects, most prominently for fundraising and raising awareness for
            the humanitarian crisis in Sudan with the Sudanese community in
            Auckland.
          </p>
          {/* <p id="artist-bio">
            Yasser Saeed is a multidisciplinary artist and photographer of Iraqi
            descent, based in Auckland New Zealand, his birthplace. He studied
            Architecture at the University of Auckland and Fine Arts at
            Whitecliffe College of Art and Design and works with photography,
            mixed media and digital art. His work is varied in its inspirations
            from architecture to ancient Middle Eastern history and ruins to
            written script but runs the common method of abstraction of forms
            and complex compositions, with themes leaking into one another.
          </p>
          <p>
            In 2018, He was awarded the Emerging Artist Award, at the Riley
            Consultants Members Merit Awards and Exhibition at Lake House Arts
            Centre, for his digital and photographic prints and his work “Text
            Experiment” was acquired by the James Wallace Arts Trust.
          </p> */}
        </div>
        <div className="lower-container">
          <h2>Exhibitions</h2>
          <div className="left-exhibitions">
            <h3>Solo Exhibition:</h3>
            <p>
              <em>“Structure Alone”</em>
              <br />
              Lake House Arts Centre, 30th May – 18th June, 2021,
              <br />
              B:Hive, Smales Farm, 25th June – 16th July, 2021,
              <br />
              Spencer on Bryon Hotel, 11th August – 3rd September 2021
              <br />
              Feature Satellite Exhibition for the Auckland Photography Festival
              <br />
              Abstract/Architectural Photographic Prints
            </p>
            <h3>Collections:</h3>
            <p>
              <em>“Text Experiment”</em>
              <br />
              Wallace Arts Centre, Pah Homestead
              <br />
              James Wallace Arts Trust, 2018
            </p>
            <h3>Awards:</h3>
            <p>
              <em>Emerging Artist Award</em>
              <br />
              Riley Consultants Members Merit Awards &amp; Exhibition
              <br />
              Lake House Arts Centre, 2018
            </p>
          </div>
          <div className="right-exhibitions">
            <h3>Group Exhibitions:</h3>
            <p>
              <em>“TBA”</em>
              <br />
              The Gallery, Baghdad, Iraq, TBA
              <br />
              Digital Print
            </p>
            <p>
              <em>“Yala, for Sudan” Fundraiser with Leena Kheir</em>
              <br />
              Yala Lounge, May 2023
              <br />
              Art Print
            </p>
            <p>
              <em>
                “Lake House Arts: a decade of award winning and emerging
                artists”
              </em>
              <br />
              Te Papakura, Beehive, Wellington, December 2022 – January 2023
              <br />
              Digital Print
            </p>
            <p>
              <em>“Sudan, A Confluence of Cultures”</em>
              <br />
              Auckland War Memorial Museum, Auckland, December 2021 – January
              2022
            </p>
            <p>Acrylic on Wood Board</p>
            <p>
              <em>
                “EMERGENT: SEE – Tertiary and Graduate Showcase and Award 2019.”
              </em>
              <br />
              Lake House Arts Centre, March 2019
              <br />
              Mixed Media
            </p>
            <p>
              <em>“Riley Consultants Members Merit Awards &amp; Exhibition”</em>
              <br />
              Lake House Arts Centre, 28th October – 24th November, 2018
              <br />
              Digital Print and Photographic Print
            </p>
            <p>
              <em>“Westlake Artworks Past and Present”</em>
              <br />
              Lake House Arts Centre, 15th October – 27th October, 2018
              <br />
              Digital Print
            </p>
            <p>
              <em>“Westlake on Show”</em>
              <br />
              Northart Gallery, October, 2017
              <br />
              Wood Sculpture
            </p>
          </div>
        </div>
      </div>
      {/* <div id="contact" className="contact-container"><Contact/></div> */}
    </>
  );
};

export default About;
