import Head from "next/head";
import Link from "next/link";
import { useSession, getSession, signOut } from "next-auth/client";
import { useContext } from "react";
import userContextFile from "../contexts/userContext";
import styles from "../styles/MyAccount.module.css";
import UserCheck from "../services/userCheck";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const isLoggedUser = UserCheck.isUserLogged(session?.user?.isLoggedUntil);
  if (!isLoggedUser) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  } else {
    return { props: {} };
  }
}

export default function MyAccount() {
  const { userContext } = useContext(userContextFile);
  const [session, loading] = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: process.env.NEXT_PUBLIC_URL_ABSOLUTE_THIS_WEBSITE });
  };

  const useStyles = makeStyles((theme) => ({
    button: {
      color: "white",
      fontWeight: 400,
      fontSize: 16,
      textTransform: "none",
      backgroundColor: "#f02213",
      "&:hover": {
        backgroundColor: "#b81004",
        boxShadow: "none",
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={styles.myAccountContainer}>
      <div className="globalGradient">
        <div className="container">
          <main className={styles.main}>
            <div className="global-white-background">
              <h1>
                <FormattedMessage
                  id="page.myAccount.title"
                  defaultMessage="My Account"
                />
              </h1>
            </div>
            <div className="global-white-background marginTop20">
              <div className={styles.signOutContainer}>
                <p>
                  <FormattedMessage
                    id="page.myAccount.logOutLabel"
                    defaultMessage="Log out Account"
                  />
                </p>
                <Button
                  onClick={handleSignOut}
                  className={classes.button}
                  variant="contained"
                  size="large"
                >
                  <FormattedMessage
                    id="page.myAccount.logOugButton"
                    defaultMessage="Sign Out"
                  />
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
