import { useSession, getSession } from "next-auth/client";
import { useContext } from "react";
import userContextFile from "../contexts/userContext";

export default function Login() {
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
    <>
      <Head>
        <title>Login</title>
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
    </>
  );
}
