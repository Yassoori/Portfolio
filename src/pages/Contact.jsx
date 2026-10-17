import { useState } from "react";
import axios from "axios";

const formEndpoint = import.meta.env.VITE_APP_WP_API_FORM_ENDPOINT;
const formId = formEndpoint?.match(
  /contact-forms\/(\d+)\/feedback\/?(?:\?.*)?$/
)?.[1];
const formUnitTag = formId ? `wpcf7-f${formId}-p0-o1` : "";

const getSubmissionErrorMessage = (responseData) => {
  const responseStatus = responseData?.status ?? responseData?.data?.status;
  const invalidFields =
    responseData?.invalid_fields ?? responseData?.data?.invalid_fields;

  if (responseStatus === "validation_failed" && Array.isArray(invalidFields)) {
    const fieldMessages = invalidFields
      .map((field) => field.message)
      .filter(Boolean);

    if (fieldMessages.length > 0) {
      return fieldMessages.join(" ");
    }
  }

  const errorMessages = {
    spam: "Your message could not be accepted. Please try again or contact me by email.",
    mail_failed:
      "Your message could not be sent. Please try again or contact me by email.",
    aborted: "Your message was not sent. Please try again.",
  };

  return (
    errorMessages[responseStatus] ??
    "Sorry, we were unable to send your message. Please check your details and try again."
  );
};

const ContactForm = () => {
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const isEndpointConfigured =
    typeof formEndpoint === "string" &&
    formEndpoint.trim().length > 0 &&
    formUnitTag.length > 0;

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

    const contactForm = new FormData(event.currentTarget);

    try {
      const response = await axios.post(formEndpoint, contactForm);
      const responseStatus = response.data?.status;

      if (responseStatus === "mail_sent") {
        setStatus("success");
        return;
      }

      if (responseStatus !== "validation_failed") {
        console.error("Unexpected contact form response:", response.data);
      }

      setStatus("error");
      setStatusMessage(getSubmissionErrorMessage(response.data));
    } catch (submissionError) {
      const responseData = submissionError.response?.data;
      if (responseData) {
        console.error("Contact form submission rejected:", responseData);
      } else {
        console.error("Contact form submission failed:", submissionError);
      }
      setStatus("error");
      setStatusMessage(getSubmissionErrorMessage(responseData));
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
        <input type="hidden" name="_wpcf7_unit_tag" value={formUnitTag} />
        <input
          id="contact-name"
          type="text"
          name="your-name"
          placeholder="Your name"
          aria-label="Your name"
          autoComplete="name"
          maxLength={400}
          onChange={(event) => setName(event.target.value)}
          value={name}
          required
        />
        <input
          id="contact-email"
          type="email"
          name="your-email"
          placeholder="Your email"
          aria-label="Your email"
          autoComplete="email"
          maxLength={400}
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          required
        />
        <input
          id="contact-subject"
          type="text"
          name="your-subject"
          placeholder="Subject"
          aria-label="Subject"
          maxLength={400}
          onChange={(event) => setSubject(event.target.value)}
          value={subject}
          required
        />
        <textarea
          id="contact-message"
          name="your-message"
          placeholder="Your message"
          aria-label="Your message"
          maxLength={2000}
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
