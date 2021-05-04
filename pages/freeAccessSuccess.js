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

export default function FreeAccessSuccess(props) {
  const [session, loading] = useSession();

  const isUserOnFreeAccess =
    session?.user?.isOnFreeAccess === 1 ||
    props.session?.user?.isOnFreeAccess === 1;

  const isUserSubd =
    isUserSubscribed(session?.user?.isSubscribedUntil) ||
    isUserSubscribed(props?.session?.user?.isSubscribedUntil);

  const Intl = useIntl();

  // TRANSLATIONS
  const translatedHead = Intl.formatMessage({
    id: "page.subscribeSuccess.head",
    defaultMessage: "Success !",
  });

  return (
    <>
      <Head>
        <title>{translatedHead}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <main className={styles.main}>
          <h1>
            <FormattedMessage
              id="page.subscribeSuccess.title"
              defaultMessage="Success !"
            />
          </h1>

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
                    defaultMessage="You can use the application, with a limit of 10,000 words. If you have any question, please contact us."
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
