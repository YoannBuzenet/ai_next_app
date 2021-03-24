import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useContext } from "react";
import userContextFile from "../contexts/userContext";
import { useSession, getSession, signIn } from "next-auth/client";

export default function Home() {
  const { userContext } = useContext(userContextFile);

  const [session, loading] = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>TextFlow - Just Generate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>Home</p>
      </main>

      <footer className={styles.footer}>
        <p>Footer</p>
      </footer>
    </div>
  );
}
