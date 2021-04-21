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
                    <p className={styles.labelParagraph}>
                      {translatedNameLabel}
                    </p>
                    <TextField
                      onChange={(e) => handleChange(e, "fullName")}
                      className={styles.inputs}
                      variant="outlined"
                      value={fields.fullName}
                      fullWidth
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <p className={styles.labelParagraph}>
                      {translatedCompanyLabel}
                    </p>
                    <TextField
                      onChange={(e) => handleChange(e, "company")}
                      className={styles.inputs}
                      variant="outlined"
                      value={fields.company}
                      fullWidth
                      required
                    />
                  </div>
                </div>
                <div className={styles.lineFieldContainer}>
                  <div className={styles.field}>
                    <p className={styles.labelParagraph}>
                      {translatedTelLabel}
                    </p>
                    <TextField
                      onChange={(e) => handleChange(e, "telephone")}
                      className={styles.inputs}
                      variant="outlined"
                      value={fields.telephone}
                      fullWidth
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <p className={styles.labelParagraph}>
                      {translatedMailLabel}
                    </p>
                    <TextField
                      onChange={(e) => handleChange(e, "mail")}
                      className={styles.inputs}
                      variant="outlined"
                      value={fields.mail}
                      fullWidth
                      required
                    />
                  </div>
                </div>
                <div className={styles.messageContainer}>
                  <div className={styles.messageField}>
                    <p className={styles.labelParagraph}>
                      {translatedMessageLabel}
                    </p>
                    <TextField
                      onChange={(e) => handleChange(e, "message")}
                      className={styles.inputs}
                      variant="outlined"
                      value={fields.message}
                      fullWidth
                      multiline
                      rows={10}
                      required
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
