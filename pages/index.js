import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useContext } from "react";
import userContextFile from "../contexts/userContext";
import { useSession, getSession, signIn } from "next-auth/client";
import Footer from "../components/Footer";
import * as Icon from "react-feather";

export default function Home() {
  const { userContext } = useContext(userContextFile);

  const [session, loading] = useSession();

  return (
    <div className="container">
      <Head>
        <title>TextFlow - Just Generate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.firstLiner}>
          <div className="container">
            <div className={styles.firstLiner}>
              <div className={styles.softwareImage}>
                <img src="/images/software_front.png" />
              </div>
              <div className={styles.mainTitle}>
                <div className={styles.leftContent}>
                  <h1 className={styles.mainPunchline}>
                    Buying cards has never been so easy
                  </h1>
                  <p>Get your own buying interface.</p>
                  <div className={styles.ctaMain}>
                    <Link href="/getStarted">
                      <a type="button">Get Started</a>
                    </Link>
                  </div>
                </div>
                <div className={styles.rightContent}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.secondLiner}>
          <div className="container">
            <div className={styles.cardsContainer}>
              <div className={styles.card}>
                <span className={styles.cardTitle}>Buy what you want</span>
                <span>
                  Fix your buying prices only on the cards you want. If you want
                  to buy everything, we've got you covered !
                </span>
              </div>
              <div className={styles.card}>
                <span className={styles.cardTitle}>Save your time</span>
                <span>
                  {" "}
                  Customers list their cards themselves. You just have to
                  receive them, check the condition, and validate.
                </span>
              </div>
              <div className={styles.card}>
                <span className={styles.cardTitle}>Sync with MKM</span>
                <span>
                  Once the customer did agree with your price and grading, you
                  just click one button. All the cards are directly for sale on
                  MKM !
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.thirdLiner}>
          <div className="container">
            <h2 className="punchline">
              Fix your prices. Let the customers do the rest.
            </h2>
            <p>
              MTG Interface enables you to fix all your buying prices for any
              MTG card : regular, foil, signed, in any condition or language.
              Your customers just have to connect, check your prices, and sell
              you their cards.
            </p>
            <div>
              <img src="/images/sampleBasket.png" />
            </div>
          </div>
        </div>
        <div className="fourth-liner">
          <div className="container">
            <h3 className="punchline">Sync with MKM</h3>
            <p>
              Cards are automatically transferred to your MKM account, ready to
              be sold.
            </p>
            <div className="tick-box">
              <div>
                <div>
                  <Icon.Check />
                  <span>Buying prices</span>
                </div>
                <div>
                  <Icon.Check />
                  <span>MKM Prices up-to-date</span>
                </div>
                <div>
                  <Icon.Check />
                  <span>Manage Sell Requests</span>
                </div>
                <div>
                  <Icon.Check />
                  <span>Manage Customers</span>
                </div>
              </div>
              <div>
                <div>
                  <Icon.Check />
                  <span>Sell Automatically</span>
                </div>
                <div>
                  <Icon.Check />
                  <span>Automatic prices</span>
                </div>
                <div>
                  <Icon.Check />
                  <span>Daily follow-up</span>
                </div>
                <div>
                  <Icon.Check />
                  <span>Update anytime</span>
                </div>
              </div>
              <div>
                <div>
                  <Icon.Check />
                  <span>Automatic Mailing</span>
                </div>
                <div>
                  <Icon.Check />
                  <span>PDF Generation</span>
                </div>
                <div>
                  <Icon.Check />
                  <span>International App</span>
                </div>
                <div>
                  <Icon.Check />
                  <span>MKM follow-up</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fifth-liner">
          <div>
            <div className="container">
              <p>Contact us and get a demo</p>
            </div>
            <Link href="/getStarted">
              <a className="CTA-button">Get Started</a>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
