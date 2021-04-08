import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSession, getSession, signIn } from "next-auth/client";
import { useContext } from "react";
import styles from "../styles/Login.module.css";
import { useIntl, FormattedMessage } from "react-intl";

export default function Login() {
  const [session, loading] = useSession();

  const Intl = useIntl();

  // TRANSLATIONS

  return (
    <>
      <Head>
        <title></title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>Well done !</main>
    </>
  );
}
