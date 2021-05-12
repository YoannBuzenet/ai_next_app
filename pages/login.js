import Head from "next/head";
import Image from "next/image";
import { useSession, getSession, signIn } from "next-auth/client";
import { useContext, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Login.module.css";
import { useIntl, FormattedMessage } from "react-intl";

export default function Login() {
  const [session, loading] = useSession();

  if (!"IntersectionObserver" in window) {
    const list = window.document.querySelectorAll("#animated");
    list.forEach(function (item) {
      item.style.opacity = 1;
    });
  }

  const handleGoogleClick = (e) => {
    e.preventDefault();
    signIn(
      "google",
      {
        callbackUrl: `${process.env.NEXT_PUBLIC_URL_ABSOLUTE_THIS_WEBSITE}/templates`,
      }
      // Uncomment to trigger a refresh token at EACH login
      // {
      //   access_type: "offline",
      // }
    );
  };

  const Intl = useIntl();

  // TRANSLATIONS
  const translatedHead = Intl.formatMessage({
    id: "page.login.head.title",
    defaultMessage: "Sign In",
  });

  useEffect(() => {
    let keypointsTransitionRight;
    let keypoints;
    let keypointsTransitionLeft;
    if ("IntersectionObserver" in window) {
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

      keypoints = new elementToTrigger(observer, "#animated");

      // Right transition

      let observerTransitionRight = new IntersectionObserver(
        (entries) => callback(entries, "transitionRight"),
        options
      );

      keypointsTransitionRight = new elementToTrigger(
        observerTransitionRight,
        "#animated-right"
      );

      // Left transition

      let observerTransitionLeft = new IntersectionObserver(
        (entries) => callback(entries, "transitionLeft"),
        options
      );

      keypointsTransitionLeft = new elementToTrigger(
        observerTransitionLeft,
        "#animated-left"
      );
    }

    return () => {
      keypoints = null;
      keypointsTransitionLeft = null;
      keypointsTransitionRight = null;
    };
  }, []);

  return (
    <>
      <Head>
        <title>{translatedHead}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="">
        <div className="loginPage">
          <main className={styles.main}>
            <div className={styles.leftPartContainer}>
              <div>
                <div className="container">
                  <h1 className="h1Common">
                    <FormattedMessage
                      id="page.login.title"
                      defaultMessage="Sign in or Create your Account"
                    />
                  </h1>
                  <div className={styles.buttonContainer}>
                    <button
                      type="button"
                      className="CTAButton"
                      onClick={handleGoogleClick}
                    >
                      <img
                        src="/icons/google.svg"
                        className={styles.googleSvg}
                      />
                      <p>
                        <FormattedMessage
                          id="page.login.CTA.connectWithGoogle"
                          defaultMessage="Continue with Google"
                        />
                      </p>
                    </button>
                  </div>
                  <div className={styles.agreeingTermsAndServices}>
                    <p>
                      <FormattedMessage
                        id="page.login.legalNotice.part1"
                        defaultMessage="By proceeding, you are agreeing to EasyFlow's "
                      />
                      <Link href="/termsAndConditions">
                        <a target="_blank" className={styles.link}>
                          <FormattedMessage
                            id="page.login.legalNotice.part2"
                            defaultMessage="Terms and Conditions "
                          />
                        </a>
                      </Link>
                      <FormattedMessage
                        id="page.login.legalNotice.part3"
                        defaultMessage="and "
                      />
                      <Link href="/privacyPolicy">
                        <a target="_blank" className={styles.link}>
                          <FormattedMessage
                            id="page.login.legalNotice.part4"
                            defaultMessage="Privacy Policy "
                          />
                        </a>
                      </Link>
                      <FormattedMessage
                        id="page.login.legalNotice.part5"
                        defaultMessage="."
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="container" id="animated">
                <img src="illustrations/Digital_marketing_SVG.svg" />
                <p className={styles.whiteParagraph}>
                  <FormattedMessage
                    id="page.login.rightPart"
                    defaultMessage="Easy writing in a few clicks"
                  />
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
