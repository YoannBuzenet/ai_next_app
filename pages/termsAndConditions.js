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
            id="page.termsAndConditions.title"
            defaultMessage="Terms And Conditions"
          />
        </h1>
        <h2>
          <FormattedMessage
            id="page.termsAndConditions.preambule"
            defaultMessage="Preambule"
          />
        </h2>
        <p>
          <FormattedMessage
            id="page.termsAndConditions.preambulePart1"
            defaultMessage="EASYFLOW offers a web service (hereinafter referred to as the « SERVICE ») aimed at helping people, be they private individuals or legal entities, (hereinafter referred to as the « USER(S) ») who wish to create text content. The terms and conditions of this SERVICE are set out in these Terms and Conditions."
          />
        </p>
        <p>
          <FormattedMessage
            id="page.termsAndConditions.preambulePart2"
            defaultMessage="Details regarding the EASYFLOW company are as follows: Yoann BUZENET,  Micro Entreprise EASYFLOW HeadQuarters : 9 Rue place Maréchal Foch, 56700 Hennebont, France, SIREN 804 965 101 00038, Tél : +336 13 64 92 72"
          />
        </p>
        <h2>
          <FormattedMessage
            id="page.termsAndConditions.article1Title"
            defaultMessage="1. Necessary conditions to access the SERVICE"
          />
        </h2>
        <p>
          <FormattedMessage
            id="page.termsAndConditions.article1.paragraph1"
            defaultMessage="You may use the SERVICE only if you are 18 years or older and capable of forming a binding contract with EASYFLOW, and not otherwise barred from using the SERVICE under applicable law. If you are accessing and using the SERVICE on behalf of a company (such as your employer) or other legal entity, you represent and warrant that you have the authority to bind that entity to these Terms. In that case, “you” and “your” will refer to that entity."
          />
        </p>
        <p>
          <FormattedMessage
            id="page.termsAndConditions.article1.paragraph2.beginning"
            defaultMessage="The USER does hereby declare that they fully understand what they can get from using the SERVICE offered by EASYFLOW as set out in these Terms and Conditions."
          />
        </p>
        <h2>
          <FormattedMessage
            id="page.termsAndConditions.article2.title"
            defaultMessage="2. Duration / Cancellation"
          />
        </h2>
        <h3>
          <FormattedMessage
            id="page.termsAndConditions.article2.subtitle1"
            defaultMessage="Duration"
          />
        </h3>
        <p>
          <FormattedMessage
            id="page.termsAndConditions.article2.subtitle1.paragraph1"
            defaultMessage="At the end of the initial subscription period, the Terms and Conditions will be renewed automatically by tacit agreement, unless you stop it. You will be billed monthly or annually, depending on the subscription chosen."
          />
        </p>
        <p>
          <FormattedMessage
            id="page.termsAndConditions.article2.subtitle1.paragraph2"
            defaultMessage="An extension of the SERVICE, called 'Reloads' allows you to use 20,000 more words during the 30 days following the purchase. It is not a subscription and is not renewed without your action."
          />
        </p>
        <h3>
          <FormattedMessage
            id="page.termsAndConditions.article2.subtitle2"
            defaultMessage="Cancellation"
          />
        </h3>
        <p>
          <FormattedMessage
            id="page.termsAndConditions.article2.subtitle2.paragraph1"
            defaultMessage="In the event that the USER fails to perform some or all of their obligations under these Terms and Conditions, EASYFLOW may cancel these Terms and Conditions as of right and at any time, with or without formal notice being made to the USER to fulfil their obligations. EASYFLOW shall send any formal notice by any means of its choice, including by simple electronic mail (e-mail)."
          />
        </p>
        <p>
          <FormattedMessage
            id="page.termsAndConditions.article3.paragraph1"
            defaultMessage="The SERVICE consists in making available to USERS a software tool allowing them to create text for various uses, marketing in particular. From a few words, the SERVICE generates texts using artificial intelligence technology. Each USER can then, under his own responsibility, choose the texts he likes, modify them, generate others, copy them and use them as they see fit. EASYFLOW does not claim any ownership over the content produced by the USER."
          />
        </p>
        <h2>
          <FormattedMessage
            id="page.termsAndConditions.article4.title"
            defaultMessage="3. LIABILITY"
          />
        </h2>
        <ul>
          <li>
            <FormattedMessage
              id="page.termsAndConditions.article4.paragraph1"
              defaultMessage="a/ The USER is solely responsible for content used and produced from the SERVICE. You represent and warrant that any text or content used in or taken from the SERVICE will not transgress or contravene a third party’s intellectual property rights, or result in the violation of any applicable law or regulation."
            />
          </li>
          <li>
            <FormattedMessage
              id="page.termsAndConditions.article4.paragraph2"
              defaultMessage="b/ The SERVICE will be used in compliance with all applicable laws."
            />
          </li>
          <li>
            <FormattedMessage
              id="page.termsAndConditions.article4.paragraph3"
              defaultMessage="c/ The SERVICE will not be used to produce, use or communicate harmful, shoking, offensive, defamatory, threatening, obscene, sensitive or unsafe content."
            />
          </li>
        </ul>
        <h2>
          <FormattedMessage
            id="page.termsAndConditions.article6.title"
            defaultMessage="4. FORCE MAJEURE"
          />
        </h2>
        <p>
          <FormattedMessage
            id="page.termsAndConditions.article6.paragraph1"
            defaultMessage="Force majeure events shall suspend the obligations of the parties as regards the Terms and Conditions. However, if the force majeure event continues for over two (2) months, each party will have the option of putting an end to the Terms and Conditions by registered post with return receipt sent to the other party."
          />
        </p>
        <h2>
          <FormattedMessage
            id="page.termsAndConditions.article7.title"
            defaultMessage="5. Right of withdrawal"
          />
        </h2>
        <p>
          <FormattedMessage
            id="page.termsAndConditions.article7.paragraph1"
            defaultMessage="As a user residing in a member country of the European Union, you have the right to withdraw from any purchase made on EASYFLOW without giving a reason."
          />
        </p>
        <p>
          <FormattedMessage
            id="page.termsAndConditions.article7.paragraph2"
            defaultMessage="However, you agree that your legal right of withdrawal will end within 14 days or after you used 10,000 words of the SERVICE after your subscription, depending on what happens first. For any reimbursement process, please contact us at support@easyflow.com."
          />
        </p>
        <h2>
          <FormattedMessage
            id="page.termsAndConditions.article8.title"
            defaultMessage="6. Miscellaneous"
          />
        </h2>
        <p>
          <FormattedMessage
            id="page.termsAndConditions.article8.paragraph2"
            defaultMessage="These Terms and Conditions give the full obligations of the parties. The fact that either party does not take advantage of any shortcoming or any failure to perform any of its obligations or any other breach by the other party of any of its obligations under the Terms and Conditions shall not be interpreted as a waiver of the obligation in question or of any of the other provisions contained in the Terms and Conditions. Similarly, any delay or failure by either party to perform the rights and prerogatives granted to them under these Terms and Conditions shall not be interpreted as a waiver of these rights and prerogatives."
          />
        </p>
        <p>
          <FormattedMessage
            id="page.termsAndConditions.article8.paragraph3"
            defaultMessage="These Terms and Conditions constitute a full and exclusive whole of the terms of the agreement entered into between EASYFLOW and the USER."
          />
        </p>
        <h2>
          <FormattedMessage
            id="page.termsAndConditions.article9.title"
            defaultMessage="7. Applicable law"
          />
        </h2>
        <p>
          <FormattedMessage
            id="page.termsAndConditions.article9.paragraph1"
            defaultMessage="Competent jurisdiction : These Terms and Conditions are subject to interpretation and performance under French law. Any dispute between EASYFLOW and the USER relating to the existence, validity, interpretation or performance of the Terms and Conditions or of any of their clauses that the parties are unable to resolve amicably shall be ruled by the Paris courts."
          />
        </p>
      </div>
    </>
  );
}
