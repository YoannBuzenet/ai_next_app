import Head from "next/head";
import Image from "next/image";
import { useSession, getSession, signIn } from "next-auth/client";
import { useContext } from "react";
import Link from "next/link";
import styles from "../styles/Login.module.css";
import { useIntl, FormattedMessage } from "react-intl";

export default function Login() {
  const [session, loading] = useSession();

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

  return (
    <>
      <Head>
        <title>{translatedHead}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="globalGradient">
        <div className="loginPage">
          <main className={styles.main}>
            <div>
              <div className="container">
                <h1 className="h1Common">
                  <FormattedMessage
                    id="page.login.title"
                    defaultMessage="Sign in or Create your Account"
                  />
                </h1>
                <Image
                  src="/pictures/googleButtons/size2/btn_google_signin_light_normal_web@2x.png"
                  alt="Connect With Google"
                  onClick={handleGoogleClick}
                  height={92}
                  width={382}
                  className={styles.images}
                />
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
            <div>
              <div className="container">right part</div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
