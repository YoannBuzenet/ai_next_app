import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useContext, useEffect } from "react";
import selectedAppLangContext from "../contexts/selectedAppLang";
import { useSession, getSession } from "next-auth/client";
import { langInApp } from "../definitions/langs";

import * as Icon from "react-feather";
import { FormattedMessage, useIntl } from "react-intl";

export async function getServerSideProps(context) {
  // We check headers from Request to see languages from user browser
  const { req } = context;

  const headersAcceptLanguages = req?.headers?.["accept-language"];

  let language = {};

  if (headersAcceptLanguages !== undefined) {
    const allLanguages = headersAcceptLanguages.split(";");
    language = allLanguages[0];
    console.log("typeof language", typeof language);
    language = language.split(",");
    language = language[0];
  }

  return {
    props: {
      userLangFromReqHeaders: language,
    },
  };
}

export default function Home(props) {
  const { currentLang, setCurrentLang } = useContext(selectedAppLangContext);

  useEffect(() => {
    if (currentLang.hasOwnProperty("isDefault")) {
      setCurrentLang(langInApp[props?.userLangFromReqHeaders]);
      window.localStorage.setItem("lang", props?.userLangFromReqHeaders);
    }
  }, []);

  const [session, loading] = useSession();

  const Intl = useIntl();

  const translatedPageTitle = Intl.formatMessage({
    id: "page.index.pageTitle",
    defaultMessage: "Cursify - AI that creates your content",
  });

  console.log("session", session);

  return (
    <>
      <Head>
        <title>{translatedPageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.firstLiner}>
          <div className="container">
            <div className={styles.firstLiner}>
              <div className={styles.softwareImage}>
                <img src="/pictures/screenshots/cursifyWorkplaceEN.png" />
              </div>
              <div className={styles.mainTitle}>
                <div className={styles.leftContent}>
                  <h1 className={styles.mainPunchline}>
                    <FormattedMessage
                      id="page.index.firstLiner.punchline"
                      defaultMessage="Generate Marketing Copy in seconds"
                    />
                  </h1>
                  <p>
                    <FormattedMessage
                      id="page.index.firstLiner.paragraph"
                      defaultMessage="One click and you're in."
                    />
                  </p>
                  <div className={styles.ctaMain}>
                    <Link href="/login">
                      <a type="button">
                        <FormattedMessage
                          id="page.index.firstLiner.CTA"
                          defaultMessage="Get Started"
                        />
                      </a>
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
                <span className={styles.cardTitle}>
                  <FormattedMessage
                    id="page.index.firstCase.slogan"
                    defaultMessage="Choose your category"
                  />
                </span>
                <span>
                  <FormattedMessage
                    id="page.index.firstCase.explaination"
                    defaultMessage="Facebook Ad ? Blog Intro ? Product Description ? We have more than 40 categories."
                  />
                </span>
              </div>
              <div className={styles.card}>
                <span className={styles.cardTitle}>
                  <FormattedMessage
                    id="page.index.secondCase.slogan"
                    defaultMessage="Give it a few words"
                  />
                </span>
                <span>
                  <FormattedMessage
                    id="page.index.secondCase.explaination"
                    defaultMessage="Give it a few words"
                  />
                </span>
              </div>
              <div className={styles.card}>
                <span className={styles.cardTitle}>
                  <FormattedMessage
                    id="page.index.thirdCase.slogan"
                    defaultMessage="And just click"
                  />
                </span>
                <span>
                  <FormattedMessage
                    id="page.index.thirdCase.explaination"
                    defaultMessage="AI generates creative and relevant text based on what you entered. You can directly copy it and use it !"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.thirdLiner}>
          <div className="container">
            <h2 className={styles.punchline}>
              <FormattedMessage
                id="page.index.thirdLiner.slogan"
                defaultMessage="Give a few words. Let the AI do the rest."
              />
            </h2>
            <p>
              <FormattedMessage
                id="page.index.thirdLiner.explaination"
                defaultMessage="Cursify uses technology based on AI. Thanks to Deep Learning, it is able to make connections that have never been done before. With just a few words, it can create specific text just for you."
              />
            </p>
            <div>
              <img src="/pictures/screenshots/productDescriptionEN.png" />
            </div>
          </div>
        </div>
        <div className={styles.fourthLiner}>
          <div className="container">
            <h3 className={styles.punchline}>
              <FormattedMessage
                id="page.index.fourthLiner.slogan"
                defaultMessage="Just generate and use it"
              />
            </h3>
            <p className={styles.explaination}>
              <FormattedMessage
                id="page.index.fourthLiner.explaination"
                defaultMessage="Words are automatically generated thanks to the Deep Learning algorithm. Creative and relevant marketing text are generated for you on the fly."
              />
            </p>
            <div className={styles.tickBox}>
              <div>
                <div>
                  <Icon.Check />
                  <span>
                    <FormattedMessage
                      id="page.index.fourthLiner.tickbox1"
                      defaultMessage="Facebook Ads"
                    />
                  </span>
                </div>
                <div>
                  <Icon.Check />
                  <span>
                    <FormattedMessage
                      id="page.index.fourthLiner.tickbox2"
                      defaultMessage="Blog Title"
                    />
                  </span>
                </div>
                <div>
                  <Icon.Check />
                  <span>
                    <FormattedMessage
                      id="page.index.fourthLiner.tickbox3"
                      defaultMessage="Blog Idea"
                    />
                  </span>
                </div>
                <div>
                  <Icon.Check />
                  <span>
                    <FormattedMessage
                      id="page.index.fourthLiner.tickbox4"
                      defaultMessage="Blog Intro"
                    />
                  </span>
                </div>
              </div>
              <div>
                <div>
                  <Icon.Check />
                  <span>
                    <FormattedMessage
                      id="page.index.fourthLiner.tickbox5"
                      defaultMessage="Product Description"
                    />
                  </span>
                </div>
                <div>
                  <Icon.Check />
                  <span>
                    <FormattedMessage
                      id="page.index.fourthLiner.tickbox6"
                      defaultMessage="Google Ad"
                    />
                  </span>
                </div>
                <div>
                  <Icon.Check />
                  <span>
                    <FormattedMessage
                      id="page.index.fourthLiner.tickbox7"
                      defaultMessage="Ad Description"
                    />
                  </span>
                </div>
                <div>
                  <Icon.Check />
                  <span>
                    <FormattedMessage
                      id="page.index.fourthLiner.tickbox8"
                      defaultMessage="Follow-up Email"
                    />
                  </span>
                </div>
              </div>
              <div>
                <div>
                  <Icon.Check />
                  <span>
                    <FormattedMessage
                      id="page.index.fourthLiner.tickbox9"
                      defaultMessage="Video Title"
                    />
                  </span>
                </div>
                <div>
                  <Icon.Check />
                  <span>
                    <FormattedMessage
                      id="page.index.fourthLiner.tickbox10"
                      defaultMessage="Linkedin Ads"
                    />
                  </span>
                </div>
                <div>
                  <Icon.Check />
                  <span>
                    <FormattedMessage
                      id="page.index.fourthLiner.tickbox11"
                      defaultMessage="Landing Page Catch Phrase"
                    />
                  </span>
                </div>
                <div>
                  <Icon.Check />
                  <span>
                    <FormattedMessage
                      id="page.index.fourthLiner.tickbox12"
                      defaultMessage="Confirmation email"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.fifthLiner}>
          <div>
            <div className="container">
              <p>
                <FormattedMessage
                  id="page.index.fifthLiner.title"
                  defaultMessage="Try it now for free"
                />
              </p>
            </div>
            <Link href="/login">
              <a className={styles.CTAButton}>
                <FormattedMessage
                  id="page.index.fifthLiner.button.title"
                  defaultMessage="Get Started"
                />
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
