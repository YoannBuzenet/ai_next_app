import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useContext } from "react";
import userContextFile from "../contexts/userContext";
import { useSession, getSession } from "next-auth/client";

import * as Icon from "react-feather";

export default function Home() {
  const { userContext } = useContext(userContextFile);

  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <title>Cursify - Generate Marketing Copy in one click</title>
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
                    Generate Marketing Copy in seconds
                  </h1>
                  <p>One click and you're in.</p>
                  <div className={styles.ctaMain}>
                    <Link href="/login">
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
                <span className={styles.cardTitle}>Choose your category</span>
                <span>
                  Facebook Ad ? Blog Intro ? Product Description ? We have more
                  than 40 categories.
                </span>
              </div>
              <div className={styles.card}>
                <span className={styles.cardTitle}>Give it a few words</span>
                <span>
                  What do you want the AI to talk about ? Give it a few words to
                  show it the way.
                </span>
              </div>
              <div className={styles.card}>
                <span className={styles.cardTitle}>And just click</span>
                <span>
                  AI generates relevant text based on what you entered. You can
                  directly copy it and use it !
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.thirdLiner}>
          <div className="container">
            <h2 className={styles.punchline}>
              Give a few words. Let the AI do the rest.
            </h2>
            <p>
              Cursify uses technology based on AI. Thanks to Deep Learning, it
              is able to make connections that have never been done before. With
              just a few words, it can create specific text just for you.
            </p>
            <div>
              <img src="/images/sampleBasket.png" />
            </div>
          </div>
        </div>
        <div className={styles.fourthLiner}>
          <div className="container">
            <h3 className={styles.punchline}>Just generate and use it</h3>
            <p>
              Words are automatically generated thanks to the Deep Learning
              algorithm. Relevant marketing text are generated for you on the
              fly.
            </p>
            <div className={styles.tickBox}>
              <div>
                <div>
                  <Icon.Check />
                  <span>Facebook Ad</span>
                </div>
                <div>
                  <Icon.Check />
                  <span>Blog Title</span>
                </div>
                <div>
                  <Icon.Check />
                  <span>Blog Idea</span>
                </div>
                <div>
                  <Icon.Check />
                  <span>Blog Intro</span>
                </div>
              </div>
              <div>
                <div>
                  <Icon.Check />
                  <span>Product Description</span>
                </div>
                <div>
                  <Icon.Check />
                  <span>Google Ad</span>
                </div>
                <div>
                  <Icon.Check />
                  <span>Instagram Caption</span>
                </div>
                <div>
                  <Icon.Check />
                  <span>Follow-up Email</span>
                </div>
              </div>
              <div>
                <div>
                  <Icon.Check />
                  <span>Video Title</span>
                </div>
                <div>
                  <Icon.Check />
                  <span>Linkedin Ads</span>
                </div>
                <div>
                  <Icon.Check />
                  <span>Landing Page Catch Phrase</span>
                </div>
                <div>
                  <Icon.Check />
                  <span>Confirmation email</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.fifthLiner}>
          <div>
            <div className="container">
              <p>Contact us and get a demo</p>
            </div>
            <Link href="/login">
              <a className={styles.CTAButton}>Get Started</a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
