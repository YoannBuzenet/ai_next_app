import Head from "next/head";
import { useIntl, FormattedMessage } from "react-intl";
import styles from "../styles/PaymentFailed.module.css";

export default function PaymentFailed(props) {
  const Intl = useIntl();
  // TRANSLATIONS
  const translatedHead = Intl.formatMessage({
    id: "page.paymentFailed.head",
    defaultMessage: "Payment Failed",
  });
  return (
    <>
      <Head>
        <title>{translatedHead}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <main className={styles.main}>
          <h1>
            <FormattedMessage
              id="page.paymentFailed.title"
              defaultMessage="The payment has failed."
            />
          </h1>

          <div className={styles.textContainer}>
            <div>
              <p>
                <FormattedMessage
                  id="page.paymentFailed.paymentCanceled"
                  defaultMessage="The paiment has been canceled. Your credit card was not used."
                />
              </p>
            </div>
            <div>
              <p>
                <FormattedMessage
                  id="page.paymentFailed.technicalProblem"
                  defaultMessage="It may be a technical problem. Please try later."
                />
              </p>
            </div>
            <div>
              <p>
                <FormattedMessage
                  id="page.paymentFailed.contactUs"
                  defaultMessage="If you have any question, contact us."
                />
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
