import styles from "../../styles/admin/portal.module.css";
import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useIntl, FormattedMessage } from "react-intl";
import notificationContext from "../../contexts/notificationsContext";
import ModelAdministration from "../../components/admin/ModelAdministration";
import Breadcrumb from "../../components/admin/Breadcrumb";
import { useSession, getSession } from "next-auth/client";
import UserCheck from "../../services/userCheck";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log("session from server", session);
  const hasAccess = UserCheck.hasAdminAccess(session?.user?.rightsCentralAPI);

  if (!hasAccess) {
    console.log("user doesnt have access");
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  } else {
    return { props: { session } };
  }
}

export default function Portal(props) {
  const { notificationInfo, setNotificationInfo } =
    useContext(notificationContext);

  const Intl = useIntl();

  const listOfMenuEntries = [
    { name: "Categories", href: "/admin/category" },
    { name: "Snippets", href: "/admin/snippet" },
    { name: "Users", href: "/admin/user" },
  ];

  return (
    <>
      <Head>
        <title>Admin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container adminPortal">
        <main className={styles.main}>
          <div className={styles.coloredBackground}>
            <Breadcrumb />
            <div className={styles.modelAdminContainer}>
              {listOfMenuEntries.map((category) => (
                <ModelAdministration
                  name={category.name}
                  href={category.href}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
