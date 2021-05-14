import styles from "../styles/admin/portal.module.css";
import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useIntl, FormattedMessage } from "react-intl";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import notificationContext from "../../contexts/notificationsContext";

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
  const [fields, setFields] = useState({
    fullName: "",
    company: "",
    telephone: "",
    mail: "",
    message: "",
  });

  const { notificationInfo, setNotificationInfo } =
    useContext(notificationContext);

  const Intl = useIntl();

  const useStyles = makeStyles((theme) => ({}));

  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Admin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container adminPortal">
        <main>
          <div className={styles.coloredBackground}></div>
        </main>
      </div>
    </>
  );
}
