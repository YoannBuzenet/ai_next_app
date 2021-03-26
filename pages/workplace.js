import Head from "next/head";
import Link from "next/link";
import { useSession, getSession } from "next-auth/client";
import { useContext, useState } from "react";
import userContextFile from "../contexts/userContext";
import styles from "../styles/Workplace.module.css";

export default function Workplace() {
  // Checker si logé, sinon redirect

  const { userContext } = useContext(userContextFile);
  const [session, loading] = useSession();

  const [isDisplayedTools, setIsDisplayedTools] = useState(true);

  const sendDataToBackEnd = () => {
    console.log("pinging the back end...");
  };

  return (
    <>
      <p>Workplace</p>
      <div className={styles.workplaceMenu}>
        <button
          type="button"
          onClick={(e) => setIsDisplayedTools(!isDisplayedTools)}
        >
          Tools
        </button>
      </div>
      <div className={styles.workToolsglobalContainer}>
        {isDisplayedTools && <div>div de gauche</div>}
        <div>div de droite</div>
      </div>
    </>
  );
}
