import React, { useEffect, useState } from "react";
import styles from "./ContactPage.module.css";

interface ContactInfo {
  header: string;
  body: string;
  phone: string;
  email: string;
  postalAddress: string;
  businessHours: string;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const ContactPage: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [formState, setFormState] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${apiUrl}/contact`)
      .then((response) => response.json())
      .then((data) => setContactInfo(data))
      .catch((error) => console.error("Error fetching contact info:", error));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/submit-form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.success);
        setFormState({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
        setFormSubmitted(true);
      } else {
        const errorData = await response.json();
        setResponseMessage(errorData.error || "Failed to send your message.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponseMessage("An error occurred. Please try again later.");
    }
  };

  if (formSubmitted) {
    return (
      <div className={styles.container}>
        <div className={styles.thankYou}>
          <h1>Thank You!</h1>
          <p>
            Your message has been successfully sent. We will contact you soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{contactInfo?.header}</h1>
      <div className={styles.contentContainer}>
        <div className={styles.leftColumn}>
          {contactInfo ? (
            <>
              <p>{contactInfo.body}</p>
              <h3>Contact Us Details</h3>
              <p>Phone: {contactInfo.phone}</p>
              <p>
                Email:{" "}
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </p>
              <h3>Postal Address:</h3>
              <p>{contactInfo.postalAddress}</p>
              <h3>Contact centre hours of operation</h3>
              <p>{contactInfo.businessHours}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className={styles.rightColumn}>
          <form onSubmit={handleSubmit}>
            <h4>
              Fill in your details and we’ll be in touch right away. Or if you
              prefer, call us on {contactInfo?.phone}
            </h4>
            <input
              type="text"
              placeholder="First name"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Last name"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              placeholder="Phone number"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
            />
            <textarea
              placeholder="What do you want to speak to us about"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
            />
            <button type="submit">Send Message</button>
          </form>
          <p className={styles.terms}>
            By sending a message you agree to the{" "}
            <a href="#">Terms and Conditions</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </p>
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
