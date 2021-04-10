import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSession, getSession, signIn } from "next-auth/client";
import { useContext } from "react";
import styles from "../styles/subscribeSuccess.module.css";
import { useIntl, FormattedMessage } from "react-intl";
import UserCheck from "../services/userCheck";
import BlueCTA from "../components/Base/BlueCTA";
import { isUserSubscribed } from "../services/userCheck";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const isLoggedUser = UserCheck.isUserLogged(session?.user?.isLoggedUntil);

  const isUserOnFreeAccess = session?.user?.isOnFreeAccess === 1;
  const isUserSubd = isUserSubscribed(session?.user?.isSubscribedUntil);

  console.log("session as seen from subscribe", session);

  if (isUserOnFreeAccess || isUserSubd) {
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

  const isUserOnFreeAccess =
    session?.user?.isOnFreeAccess === 1 ||
    props.session?.user?.isOnFreeAccess === 1;

  console.log("free access 0", isUserOnFreeAccess);
  console.log("free access 1", session?.user?.isOnFreeAccess === 1);
  console.log("free access 2", props.session?.user?.isOnFreeAccess === 1);

  const isUserSubd =
    isUserSubscribed(session?.user?.isSubscribedUntil) ||
    isUserSubscribed(props?.session?.user?.isSubscribedUntil);

  const Intl = useIntl();

  console.log("bro", session);
  console.log("broServ", props?.sessionServ);
  console.log("broProps", props);

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
          {isUserSubd && (
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
          )}
          {/* Free Access Part */}
          {isUserOnFreeAccess && (
            <div className={styles.textContainer}>
              <div>
                <p>
                  <FormattedMessage
                    id="page.subscribeSuccess.freeAccess.freeAccess"
                    defaultMessage="You now have a free access to EasyFlow !"
                  />
                </p>
              </div>
              <div>
                <p>
                  <FormattedMessage
                    id="page.subscribeSuccess.freeAccess.youCanNowUseTheApp"
                    defaultMessage="You can use the application, with a limit of 5,000 words. If you have any question, please contact us."
                  />
                </p>
              </div>
              <div>
                <p>
                  <FormattedMessage
                    id="page.subscribeSuccess.freeAccess.followConsumption"
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
          )}
        </main>
      </div>
    </>
  );
}
