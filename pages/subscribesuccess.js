import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSession, getSession, signIn } from "next-auth/client";
import { useContext, useEffect } from "react";
import styles from "../styles/subscribeSuccess.module.css";
import { useIntl, FormattedMessage } from "react-intl";
import UserCheck from "../services/userCheck";
import BlueCTA from "../components/Base/BlueCTA";
import { isUserSubscribed } from "../services/userCheck";
import { useRouter } from "next/router";
import axios from "axios";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  console.log("session as seen from server", session);

  if (context.query.hasOwnProperty("session_id")) {
    return { props: { session } };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: { sessionServ: session },
    };
  }
}
export default function Subscribesuccess(props) {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    // ping next api with idsession + id user
    const sessionId = router?.query?.session_id;

    if (sessionId === undefined) {
      router.push("/");
      return;
    }

    axios.post("/api/payment/session", {
      user: session.user,
      session_id: sessionId,
    });
  }, []);

  // const isUserSubd =
  //   isUserSubscribed(session?.user?.isSubscribedUntil) ||
  //   isUserSubscribed(props?.session?.user?.isSubscribedUntil);

  const Intl = useIntl();

  console.log("session", session);
  console.log("session serv", props);

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
          <h1>
            <FormattedMessage
              id="page.subscribeSuccess.title"
              defaultMessage="Success !"
            />
          </h1>
          {/* Sub part */}

          <div className={styles.textContainer}>
            <div>
              <p>
                <FormattedMessage
                  id="page.subscribeSuccess.subscribed.youArenowSubscribed"
                  defaultMessage="You are now subscribed to our services."
                />
              </p>
            </div>
            <div>
              <p>
                <FormattedMessage
                  id="page.subscribeSuccess.subscribed.youCanUseTheApp"
                  defaultMessage="You can use the application. If needed, feel free to contact us."
                />
              </p>
            </div>
            <div>
              <p>
                <FormattedMessage
                  id="page.subscribeSuccess.subscribed.followConsumption"
                  defaultMessage="To follow your word use, please check the 'My Account' tab."
                />
              </p>
            </div>
            <div>
              <BlueCTA
                to="/templates"
                handleClick={() => {}}
                idLabel="page.subscribeSuccess.button.GoToApp"
                defaultLabel="Go To App"
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
