import Head from "next/head";

export default function PaymentFailed(props) {
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
