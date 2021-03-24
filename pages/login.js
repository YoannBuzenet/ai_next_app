import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSession, getSession, signIn } from "next-auth/client";
import { useContext } from "react";
import userContextFile from "../contexts/userContext";
import styles from "../styles/Login.module.css";
import { useIntl, FormattedMessage } from "react-intl";

export default function Login() {
  const { userContext } = useContext(userContextFile);
  const [session, loading] = useSession();

  const handleGoogleClick = (e) => {
    e.preventDefault();
    signIn("google");
    console.log("e", e);
    console.log("session", session);
  };

  const handleDisplaySession = () => {
    console.log("session", session);
  };

  const Intl = useIntl();

  // TRANSLATIONS
  const translatedHead = Intl.formatMessage({
    id: "page.login.title",
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
              <h1 className="h1Common">Sign in or Create your Account</h1>
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
                  By proceeding, you are agreeing to Cursive's Terms of Service
                  and Privacy Notice
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
