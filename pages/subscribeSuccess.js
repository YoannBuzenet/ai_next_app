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
          <h1>Bravo !</h1>
          <div className={styles.textContainer}>
            <div>
              <p>Vous êtes désormais abonné à nos services.</p>
            </div>
            <div>
              <p>
                Vous pouvez utiliser l'application à loisir. En cas de besoin,
                n'hésitez pas à nous contacter.
              </p>
            </div>
            <div>
              <p>
                Pour suivre l'évolution de vos consommations, consulez l'onglet
                "Mon Compte".
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
              <p>Vous avez désormais un accès gratuits à EasyFlow !</p>
            </div>
            <div>
              <p>
                Vous pouvez utiliser l'application à loisir dans la limite de
                5000 mots. En cas de besoin, n'hésitez pas à nous contacter.
              </p>
            </div>
            <div>
              <p>
                Pour suivre l'évolution de vos consommations, consulez l'onglet
                "Mon Compte".
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
