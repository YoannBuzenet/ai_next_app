import styles from "../styles/ContactUs.module.css";
import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useIntl, FormattedMessage } from "react-intl";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import notificationContext from "../contexts/notificationsContext";

export default function ContactUs(props) {
  const [fields, setFields] = useState({
    fullName: "",
    company: "",
    telephone: "",
    mail: "",
    message: "",
  });

  const { notificationInfo, setNotificationInfo } = useContext(
    notificationContext
  );

  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://www.google.com/recaptcha/api.js?render=" +
      process.env.NEXT_PUBLIC_GOOGLE_CLIENTSIDE_RECAPTCHA_KEY;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e, fieldName) => {
    console.log("form changed !");
    // switch pour controler si besoin puis
    setFields({ ...fields, [fieldName]: e.target.value });
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

  const translatedMessageSuccess = Intl.formatMessage({
    id: "page.contactUs.form.notification.success",
    defaultMessage:
      "Your message has been sent. We will get back to you as soon as possible.",
  });
  const translatedMessageFailure = Intl.formatMessage({
    id: "page.contactUs.form.notification.failure",
    defaultMessage:
      "Your message could not be sent for technical reasons. Please try again later.",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    grecaptcha.ready(function () {
      grecaptcha
        .execute(process.env.NEXT_PUBLIC_GOOGLE_CLIENTSIDE_RECAPTCHA_KEY, {
          action: "form_submission",
        })
        .then(function (token) {
          // console.log(token);
          //Adding token to state
          fields["token"] = token;
          axios
            .post("api/mail/contact-us", fields)
            .then((respServer) => {
              setNotificationInfo({
                ...notificationInfo,
                alert: {
                  ...notificationInfo.alert,
                  message: translatedMessageSuccess,
                  severity: "success",
                },
                snackbar: {
                  ...notificationInfo.snackbar,
                  isDisplayed: true,
                },
              });
            })
            .catch((error) => {
              console.log(error);
              setNotificationInfo({
                ...notificationInfo,
                alert: {
                  ...notificationInfo.alert,
                  message: translatedMessageFailure,
                  severity: "error",
                },
                snackbar: {
                  ...notificationInfo.snackbar,
                  isDisplayed: true,
                },
              });
            });
        });
    });
    console.log("form is submitted");
  };

  const useStyles = makeStyles((theme) => ({}));

  const classes = useStyles();

  return (
    <>
      <Head>
        <title>{translatedHead}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
