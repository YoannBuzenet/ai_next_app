import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useContext } from "react";
import userContextFile from "../contexts/userContext";
import { useSession, getSession, signIn } from "next-auth/client";

export default function Home() {
  const { userContext } = useContext(userContextFile);

  const [session, loading] = useSession();

  const handleGoogleClick = (e) => {
    e.preventDefault();
    console.log("env var test", process.env.NEXT_PUBLIC_PUBLISHABLE_KEY);
    signIn("google");
    console.log("e", e);
    console.log("session", session);
  };

  const handleDisplaySession = () => {
    console.log("session", session);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>Google Connect</p>
        <button type="button" onClick={handleGoogleClick}>
          Google
        </button>
        <p>Log Session</p>
        <button type="button" onClick={handleDisplaySession}>
          Log
        </button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
