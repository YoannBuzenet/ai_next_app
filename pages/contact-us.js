import styles from "../styles/ContactUs.module.css";
import { useState } from "react";
import Head from "next/head";
import { useIntl, FormattedMessage } from "react-intl";

export default function ContactUs(props) {
  const [fields, setFields] = useState({
    company: "",
    fullName: "",
    telephone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    console.log("form is submitted");
  };

  // TRANSLATIONS
  const translatedHead = Intl.formatMessage({
    id: "page.contactUs.head",
    defaultMessage: "Contact Us",
  });

  return (
    <>
      <Head>
        <title>{translatedHead}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <main>
          <h1>{translatedHead}</h1>
          <div>
            <form>
              <div className={styles.field}></div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
