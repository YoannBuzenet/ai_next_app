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

  const handleChange = (e, fieldName) => {
    console.log("form changed !");
    // switch pour controler si besoin puis
    setFields({ ...fields, [fieldName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
  const translatedMessageLabel = Intl.formatMessage({
    id: "page.contactUs.form.company",
    defaultMessage: "Company*",
  });
  const translatedCompanyLabel = Intl.formatMessage({
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
      <div className="container">
        <main>
          <div className={styles.coloredBackground}></div>
          <div className={styles.formArea}>
            <h1>{translatedHead}</h1>
            <div className={styles.formHeader}></div>
            <div className={styles.formContainer}>
              <form>
                <div className={styles.field}>
                  <TextField
                    label={translatedNameLabel}
                    onChange={(e) => handleChange(e, "fullName")}
                    className={styles.inputs}
                    variant="outlined"
                    value={fields.fullName}
                  />
                </div>
                <div className={styles.field}>
                  <TextField
                    label={translatedCompanyLabel}
                    onChange={(e) => handleChange(e, "company")}
                    className={styles.inputs}
                    variant="outlined"
                    value={fields.company}
                  />
                </div>
                <div className={styles.field}>
                  <TextField
                    label={translatedTelLabel}
                    onChange={(e) => handleChange(e, "telephone")}
                    className={styles.inputs}
                    variant="outlined"
                    value={fields.telephone}
                  />
                </div>
                <div className={styles.field}>
                  <TextField
                    label={translatedMailLabel}
                    onChange={(e) => handleChange(e, "mail")}
                    className={styles.inputs}
                    variant="outlined"
                    value={fields.mail}
                  />
                </div>
                <div className={styles.messageContainer}>
                  <div className={styles.field}>
                    <TextField
                      label={translatedMessageLabel}
                      onChange={(e) => handleChange(e, "message")}
                      className={styles.inputs}
                      variant="outlined"
                      value={fields.message}
                    />
                  </div>
                </div>
                <div className={styles.buttonContainer}>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className={styles.submitButton}
                  >
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
