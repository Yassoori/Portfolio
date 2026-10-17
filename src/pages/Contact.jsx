import { useState } from "react";
import axios from "axios";

const formEndpoint = import.meta.env.VITE_APP_WP_API_FORM_ENDPOINT;

const ContactForm = () => {
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const isEndpointConfigured =
    typeof formEndpoint === "string" && formEndpoint.trim().length > 0;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isEndpointConfigured) {
      setStatus("error");
      setStatusMessage(
        "The contact form is not configured. Please contact me by email instead."
      );
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    const contactForm = new FormData();
    contactForm.append("your-name", name);
    contactForm.append("your-email", email);
    contactForm.append("your-subject", subject);
    contactForm.append("your-message", message);

    try {
      const response = await axios.post(formEndpoint, contactForm);
      const responseStatus = response.data?.status;

      if (responseStatus === "mail_sent") {
        setStatus("success");
        return;
      }

      const errorMessages = {
        validation_failed: "Please check your details and try again.",
        spam: "Your message could not be accepted. Please try again or contact me by email.",
        mail_failed:
          "Your message could not be sent. Please try again or contact me by email.",
        aborted: "Your message was not sent. Please try again.",
      };
      const responseMessage = errorMessages[responseStatus];

      if (!responseMessage) {
        console.error("Unexpected contact form response:", response.data);
      }

      setStatus("error");
      setStatusMessage(
        responseMessage ??
          "Sorry, we could not confirm that your message was sent. Please try again or contact me by email."
      );
    } catch (submissionError) {
      console.error("Contact form submission failed:", submissionError);
      setStatus("error");
      setStatusMessage(
        "Sorry, we were unable to send your message. Please try again or contact me by email."
      );
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite">
        <h3>Thank you for your message!</h3>
        <p>We'll be in touch soon.</p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} method="POST">
        <label htmlFor="contact-name">Your name</label>
        <input
          id="contact-name"
          type="text"
          name="your-name"
          autoComplete="name"
          onChange={(event) => setName(event.target.value)}
          value={name}
          required
        />
        <label htmlFor="contact-email">Your email</label>
        <input
          id="contact-email"
          type="email"
          name="your-email"
          autoComplete="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          required
        />
        <label htmlFor="contact-subject">Subject</label>
        <input
          id="contact-subject"
          type="text"
          name="your-subject"
          onChange={(event) => setSubject(event.target.value)}
          value={subject}
          required
        />
        <label htmlFor="contact-message">Your message</label>
        <textarea
          id="contact-message"
          name="your-message"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          required
        />
        {(!isEndpointConfigured || status === "error") && (
          <p role="alert" aria-live="assertive">
            {isEndpointConfigured
              ? statusMessage
              : "The contact form is not configured. Please contact me by email instead."}
          </p>
        )}
        {status === "submitting" && (
          <p role="status" aria-live="polite">
            Sending your message…
          </p>
        )}
        <button
          id="submit-button"
          className="regular-button"
          type="submit"
          disabled={!isEndpointConfigured || status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Send"}
        </button>
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
