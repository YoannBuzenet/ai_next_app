import { useIntl, FormattedMessage } from "react-intl";
import Head from "next/head";
import styles from "../styles/TermsAndConditions.module.css";

export default function TermsAndConditions() {
  const Intl = useIntl();

  // TRANSLATIONS
  const translatedHead = Intl.formatMessage({
    id: "page.termsAndConditions.head.title",
    defaultMessage: "Terms And Conditions",
  });

  return (
    <>
      <Head>
        <title>{translatedHead}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
