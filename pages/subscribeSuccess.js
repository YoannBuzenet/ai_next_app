import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSession, getSession, signIn } from "next-auth/client";
import { useContext } from "react";
import styles from "../styles/subscribeSuccess.module.css";
import { useIntl, FormattedMessage } from "react-intl";
import UserCheck from "../services/userCheck";
import BlueCTA from "../components/Base/BlueCTA";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const isLoggedUser = UserCheck.isUserLogged(session?.user?.isLoggedUntil);

  console.log("session on server", session);

  const isUserOnFreeAccess = session?.user?.isOnFreeAccess;
  const isSubscribedUntil =
    session?.user?.isSubscribedUntil !== "" &&
    "DATE EN UTC SUPERIEURE A AUJOURDHUI";

  // TO DO : filtrer si pas abonné ou si pas accès gratuit

  //   if (!isLoggedUser) {
  //     return {
  //       redirect: {
  //         destination: "/",
  //         permanent: false,
  //       },
  //       props: { session },
  //     };
  //   } else {
  //     return { props: { session } };
  //   }
  return { props: { session } };
}

export default function subscribeSuccess({ session }) {
  console.log("sessoin :", session);

  const Intl = useIntl();

  // TRANSLATIONS
  const translatedHead = Intl.formatMessage({
    id: "page.subscribeSuccess.head",
    defaultMessage: "Success !",
  });

  // si free access
  // si isSubscribedUntil

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
        </main>
      </div>
    </>
  );
}
