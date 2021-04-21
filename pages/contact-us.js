import styles from "../styles/ContactUs.module.css";
import { useState } from "react";
import Head from "next/head";
import { useIntl, FormattedMessage } from "react-intl";
import { TextField } from "@material-ui/core";

export default function ContactUs(props) {
  const [fields, setFields] = useState({
    company: "",
    fullName: "",
    telephone: "",
    mail: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form is submitted");
  };

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

  return (
    <>
      <Head>
        <title>{translatedHead}</title>
      </Head>
      <div className="container">
        <main>
          <h1>{translatedHead}</h1>
          <div className={styles.formArea}>
            <div className={styles.formContainer}>
              <form>
                <div className={styles.field}>
                  <TextField label={translatedNameLabel} />
                </div>
                <div className={styles.field}>
                  <TextField label={translatedCompanyLabel} />
                </div>
                <div className={styles.field}>
                  <TextField label={translatedTelLabel} />
                </div>
                <div className={styles.field}>
                  <TextField label={translatedMailLabel} />
                </div>
                <div className={styles.field}>
                  <TextField label={translatedMessageLabel} />
                </div>
                <div className={styles.buttonContainer}>
                  <button type="submit" onClick={handleSubmit}>
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
