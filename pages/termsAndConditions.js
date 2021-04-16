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
      <div className={styles.termsAndConditionsPage}>
        <h1>
          <FormattedMessage
            id="app.page.termsAndConditions.title"
            defaultMessage="Terms And Conditions"
          />
        </h1>
        <h2>
          <FormattedMessage
            id="app.page.termsAndConditions.preambule"
            defaultMessage="Preambule"
          />
        </h2>
        <p>
          <FormattedMessage
            id="app.page.termsAndConditions.preambulePart1"
            defaultMessage="EASYFLOW offers a web service (hereinafter referred to as the « SERVICE ») aimed at helping people, be they private individuals or legal entities, (hereinafter referred to as the « USER(S) ») who wish to create text content. The terms and conditions of this SERVICE are set out in these Terms and Conditions."
          />
        </p>
        <p>
          <FormattedMessage
            id="app.page.termsAndConditions.preambulePart2"
            defaultMessage="Details regarding the EASYFLOW company are as follows: Yoann BUZENET,  Micro Entreprise EASYFLOW HeadQuarters : 9 Rue place Maréchal Foch, 56700 Hennebont, France, SIREN 804 965 101 00038, Tél : +336 13 64 92 72"
          />
        </p>
        <h2>
          <FormattedMessage
            id="app.page.termsAndConditions.article1Title"
            defaultMessage="1. Necessary conditions to access the SERVICE"
          />
        </h2>
        <p>
          <FormattedMessage
            id="app.page.termsAndConditions.article1.paragraph1"
            defaultMessage="You may use the SERVICE only if you are 18 years or older and capable of forming a binding contract with EASYFLOW, and not otherwise barred from using the SERVICE under applicable law. If you are accessing and using the SERVICE on behalf of a company (such as your employer) or other legal entity, you represent and warrant that you have the authority to bind that entity to these Terms. In that case, “you” and “your” will refer to that entity."
          />
        </p>
        <p>
          <FormattedMessage
            id="app.page.termsAndConditions.article1.paragraph2.beginning"
            defaultMessage="The USER does hereby declare that they fully understand what they can get from using the SERVICE offered by EASYFLOW as set out in these Terms and Conditions."
          />
        </p>
        <h2>
          <FormattedMessage
            id="app.page.termsAndConditions.article2.title"
            defaultMessage="2. Duration / Cancellation"
          />
        </h2>
      </div>
    </>
  );
}
