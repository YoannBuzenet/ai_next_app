import Head from "next/head";
import { useIntl, FormattedMessage } from "react-intl";

export default function PaymentFailed(props) {
  const Intl = useIntl();
  // TRANSLATIONS
  const translatedHead = Intl.formatMessage({
    id: "page.subscribeSuccess.head",
    defaultMessage: "Success !",
  });
  return (
    <>
      <Head>
        <title>{translatedHead}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <main className={styles.main}>
          <h1>payment failed</h1>
          {/* Sub part */}
          {isUserSubd && (
            <div className={styles.textContainer}>
              <div>
                <p>payment failed</p>
              </div>
              <div>
                <p>payment failed</p>
              </div>
              <div>
                <p>payment failed</p>
              </div>
              <div>payment failed</div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
