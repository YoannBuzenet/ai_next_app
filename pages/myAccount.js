import Head from "next/head";
import Link from "next/link";
import { useSession, getSession, signOut } from "next-auth/client";
import { useContext } from "react";
import userContextFile from "../contexts/userContext";
import styles from "../styles/MyAccount.module.css";
import UserCheck from "../services/userCheck";

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

  return <>My Account</>;
}
