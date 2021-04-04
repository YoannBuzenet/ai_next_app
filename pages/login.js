import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSession, getSession, signIn } from "next-auth/client";
import { useContext } from "react";
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
      //   prompt: "consent",
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="globalGradient">
        <div className="container">
          <main className={styles.main}>
            <div>
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
                    id="page.login.legalNotice"
                    defaultMessage="By proceeding, you are agreeing to Cursify's Terms of Service."
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
