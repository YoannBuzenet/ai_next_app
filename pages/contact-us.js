import styles from "../styles/ContactUs.module.css";
import { useState } from "react";
import Head from "next/head";
import { useIntl, FormattedMessage } from "react-intl";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function ContactUs(props) {
  const [fields, setFields] = useState({
    fullName: "",
    company: "",
    telephone: "",
    mail: "",
    message: "",
  });

  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://www.google.com/recaptcha/api.js?render=" +
      process.env.NEXT_PUBLIC_CLIENTSIDE_RECAPTCHA_KEY;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e, fieldName) => {
    console.log("form changed !");
    // switch pour controler si besoin puis
    setFields({ ...fields, [fieldName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    grecaptcha.ready(function () {
      grecaptcha
        .execute(process.env.NEXT_PUBLIC_CLIENTSIDE_RECAPTCHA_KEY, {
          action: "form_submission",
        })
        .then(function (token) {
          console.log(token);
          //Adding token to state
          formData["token"] = token;
          axios
            .post("api/mail/contact-us", formData)
            .then((respServer) => setIsPopUpDisplayed(true))
            .catch((error) => console.log(error));
        });
    });
    console.log("form is submitted");
  };

  const Intl = useIntl();

  // TRANSLATIONS
  const translatedHead = Intl.formatMessage({
    id: "page.contactUs.head",
    defaultMessage: "Contact Us",
  });
  const translatedNameLabel = Intl.formatMessage({
    id: "page.contactUs.form.fullName",
    defaultMessage: "Your name*",
  });
  const translatedTelLabel = Intl.formatMessage({
    id: "page.contactUs.form.tel",
    defaultMessage: "Phone Number*",
  });
  const translatedMailLabel = Intl.formatMessage({
    id: "page.contactUs.form.mail",
    defaultMessage: "Contact email*",
  });
  const translatedCompanyLabel = Intl.formatMessage({
    id: "page.contactUs.form.company",
    defaultMessage: "Company*",
  });
  const translatedMessageLabel = Intl.formatMessage({
    id: "page.contactUs.form.message",
    defaultMessage: "Your message*",
  });

  const useStyles = makeStyles((theme) => ({}));

  const classes = useStyles();

  return (
    <>
      <Head>
        <title>{translatedHead}</title>
      </Head>
      <div className="container contactUs">
        <main>
          <div className={styles.coloredBackground}></div>
          <div className={styles.formArea}>
            <h1>{translatedHead}</h1>
            <div className={styles.formHeader}></div>
            <div className={styles.formContainer}>
              <form onSubmit={handleSubmit}>
                <div className={styles.lineFieldContainer}>
                  <div className={styles.field}>
                    <label className={styles.labelParagraph} htmlFor="fullName">
                      {translatedNameLabel}
                    </label>
                    <TextField
                      onChange={(e) => handleChange(e, "fullName")}
                      className={styles.inputs}
                      variant="outlined"
                      value={fields.fullName}
                      fullWidth
                      required
                      id="fullName"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.labelParagraph} htmlFor="company">
                      {translatedCompanyLabel}
                    </label>
                    <TextField
                      onChange={(e) => handleChange(e, "company")}
                      className={styles.inputs}
                      variant="outlined"
                      value={fields.company}
                      fullWidth
                      required
                      id="company"
                    />
                  </div>
                </div>
                <div className={styles.lineFieldContainer}>
                  <div className={styles.field}>
                    <label
                      className={styles.labelParagraph}
                      htmlFor="telephone"
                    >
                      {translatedTelLabel}
                    </label>
                    <TextField
                      onChange={(e) => handleChange(e, "telephone")}
                      className={styles.inputs}
                      variant="outlined"
                      value={fields.telephone}
                      fullWidth
                      required
                      type="tel"
                      id="telephone"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.labelParagraph} htmlFor="mail">
                      {translatedMailLabel}
                    </label>
                    <TextField
                      onChange={(e) => handleChange(e, "mail")}
                      className={styles.inputs}
                      variant="outlined"
                      value={fields.mail}
                      fullWidth
                      required
                      type="email"
                      id="mail"
                    />
                  </div>
                </div>
                <div className={styles.messageContainer}>
                  <div className={styles.messageField}>
                    <label className={styles.labelParagraph} htmlFor="message">
                      {translatedMessageLabel}
                    </label>
                    <TextField
                      onChange={(e) => handleChange(e, "message")}
                      className={styles.inputs}
                      variant="outlined"
                      value={fields.message}
                      fullWidth
                      multiline
                      rows={10}
                      required
                      id="message"
                    />
                  </div>
                </div>
                <div className={styles.buttonContainer}>
                  <button type="submit" className={styles.submitButton}>
                    <FormattedMessage
                      id="page.contactUs.form.submit.button"
                      defaultMessage="Submit"
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
