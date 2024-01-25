import { useState } from "react";
import axios from "axios";

const formEndpoint = import.meta.env.VITE_APP_WP_API_FORM_ENDPOINT;

console.log(formEndpoint);

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const contactForm = new FormData();
    contactForm.append("your-name", name);
    contactForm.append("your-email", email);
    contactForm.append("your-subject", subject);
    contactForm.append("your-message", message);
    // console.log();

    axios
      .post(formEndpoint, contactForm, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log(response);
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  if (submitted) {
    return (
      <>
        <h3>Thank you for your message!</h3>
        <p>We'll be in touch soon</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h3>Error!</h3>
        <p>Sorry, we were unable to send your message</p>
      </>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} method="POST">
        {/* <div> */}
          <input
            type="text"
            name="name"
            onChange={(event) => setName(event.target.value)}
            value={name}
            required
            placeholder="Your name"
          />
        {/* </div> */}
        {/* <div> */}
          <input
            type="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
            placeholder="Your email"
          />
        {/* </div> */}
        {/* <div> */}
          <input
            type="subject"
            name="subject"
            onChange={(event) => setSubject(event.target.value)}
            value={subject}
            required
            placeholder="Your subject"
          />
        {/* </div> */}
        {/* <div> */}
          <textarea
            type="message"
            name="message"
            onChange={(event) => setMessage(event.target.value)}
            value={message}
            required
            placeholder="Your message"
          />
        {/* </div> */}
        {/* <div> */}
          <button id="submit-button" className="regular-button" type="submit">
            Send
          </button>
        {/* </div> */}
      </form>
    </>
  );
};

const Contact = () => {
  return (
    <>
      <div id="contact-page" className="container single-container">
        <p className="contact-sub">Looking to commission a website, an artwork or a photoshoot?</p>
        <h2 className="contact-heading">Let's chat.</h2>
        <ContactForm />
      </div>
    </>
  );
};

export default Contact;
