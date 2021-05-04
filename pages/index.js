import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useContext, useEffect } from "react";
import selectedAppLangContext from "../contexts/selectedAppLang";
import notificationContext from "../contexts/notificationsContext";
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
  const { notificationInfo, setNotificationInfo } = useContext(
    notificationContext
  );

  useEffect(() => {
    if (currentLang.hasOwnProperty("isDefault")) {
      setCurrentLang(langInApp[props?.userLangFromReqHeaders]);
      window.localStorage.setItem("lang", props?.userLangFromReqHeaders);
    }
  }, []);

  useEffect(() => {
    var elementToTrigger = class ElementToTrigger {
      constructor(observer, id) {
        this.observer = observer;
        this.id = id;
        this.init();
      }

      init() {
        const targets = document.querySelectorAll(this.id);

        targets.forEach((li) => {
          this.observer.observe(li);
        });
      }
    };

    var options = {
      rootMargin: "0px",
      threshold: 0.2,
    };

    function callback(entries, classToAdd) {
      entries.filter((el) => {
        if (el.isIntersecting) {
          el.target.classList.add(classToAdd);
        }
      });
    }

    // Classic transition

    let observer = new IntersectionObserver(
      (entries) => callback(entries, "visible"),
      options
    );

    let keypoints = new elementToTrigger(observer, "#animated");

    // Right transition

    let observerTransitionRight = new IntersectionObserver(
      (entries) => callback(entries, "transitionRight"),
      options
    );

    let keypointsTransitionRight = new elementToTrigger(
      observerTransitionRight,
      "#animated-right"
    );

    // Left transition

    let observerTransitionLeft = new IntersectionObserver(
      (entries) => callback(entries, "transitionLeft"),
      options
    );

    let keypointsTransitionLeft = new elementToTrigger(
      observerTransitionLeft,
      "#animated-left"
    );

    return () => {
      keypoints = null;
      keypointsTransitionLeft = null;
      keypointsTransitionRight = null;
    };
  }, []);

  const [session, loading] = useSession();

  const Intl = useIntl();

  const translatedPageTitle = Intl.formatMessage({
    id: "page.index.pageTitle",
    defaultMessage: "EasyFlow - AI that creates your content",
  });

  console.log("session", session);

  return (
    <>
      <Head>
        <title>{translatedPageTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          http-equiv="Content-Security-Policy"
          content="default-src * 'self' data: 'unsafe-inline' 'unsafe-eval' *; child-src * 'self' data: 'unsafe-inline' 'unsafe-eval' *; script-src * 'self' data: 'unsafe-inline' 'unsafe-eval' *"
        ></meta>
      </Head>

      <main>
        <div className={styles.firstLiner}>
          <div className="container">
            <div className={styles.firstLiner}>
              <div className={styles.dotsContainer}></div>
              <div className={styles.softwareImage}>
                <img src="/pictures/photos/working-with-easyflow.png" />
              </div>
              <div className={styles.mainTitle}>
                <div className={styles.leftContent}>
                  <h1 className={styles.mainPunchline} id="animated">
                    <FormattedMessage
                      id="page.index.firstLiner.punchline"
                      defaultMessage="Generate Marketing Copy in seconds"
                    />
                  </h1>
                  <div className={styles.secondArea} id="animated">
                    <p>
                      <FormattedMessage
                        id="page.index.firstLiner.paragraph"
                        defaultMessage="Generate qualitative and creative text easily"
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
                    defaultMessage="Marketing Text ? Facebook Ad ? Blog Intro ? We have more than 20 categories."
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
                    defaultMessage="What do you want the AI to talk about ? Give it a few words to show it the way."
                  />
                </span>
              </div>
              <div className={styles.card}>
                <span className={styles.cardTitle}>
                  <FormattedMessage
                    id="page.index.thirdCase.slogan"
                    defaultMessage="And let it write"
                  />
                </span>
                <span>
                  <FormattedMessage
                    id="page.index.thirdCase.explaination"
                    defaultMessage="AI generates automatically creative and relevant text based on what you entered. You can directly copy it and use it !"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.thirdLiner}>
          <div className={styles.thirdLinerSvgContainer} id="animated">
            <img src="/illustrations/Business_SVG.svg" />
          </div>
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
                defaultMessage="EasyFlow uses technology based on AI. Thanks to Deep Learning, it is able to make connections that have never been done before. With just a few words, it can create specific text just for you."
              />
            </p>
            <div>
              <img
                src="/pictures/screenshots/productDescriptionEN.png"
                className={styles.thirdLineMainImage}
              />
            </div>
          </div>
        </div>
        <div className={styles.fourthLiner}>
          <div className="container opacity0" id="animated">
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
                      defaultMessage="Keyword Integrator"
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
          <div className="container">
            <div className={styles.finalCTASlogan} id="animated-left">
              <p>
                <FormattedMessage
                  id="page.index.fifthLiner.title"
                  defaultMessage="Try it now for free"
                />
              </p>
            </div>
            <div id="animated-right" className={styles.finalButton}>
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
        </div>
      </main>
    </>
  );
}
