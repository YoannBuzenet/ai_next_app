import Head from "next/head";
import Test from "../components/AppWrapper";
import styles from "../styles/Home.module.css";
import { useContext } from "react";
import userContextFile from "../contexts/userContext";

export default function Home() {
  const { userContext } = useContext(userContextFile);
  console.log("yo", userContext);

  const handleGoogleClick = (e) => {
    console.log("e", e);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Test />
        <p>Google Connect</p>
        <button type="button" onClick={handleGoogleClick}>
          Google
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
