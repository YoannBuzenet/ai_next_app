import Head from "next/head";
import Link from "next/link";
import CategorySelector from "../components/CategorySelector";
import { useSession, getSession } from "next-auth/client";
import { useContext, useState } from "react";
import userContextFile from "../contexts/userContext";
import styles from "../styles/Workplace.module.css";
import { categoriesDefinition } from "../definitions/categories";
import HeartWorkPlace from "../components/HeartWorkPlace";

export default function Workplace() {
  // TODO 2nd step
  // Checker si logé, sinon redirect
  // si on start avec isMobile = true, isDisplayedTools est true et le bouton pour le cacher disparait

  const { userContext } = useContext(userContextFile);
  const [session, loading] = useSession();

  const [isDisplayedTools, setIsDisplayedTools] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(null);

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
        {isDisplayedTools && (
          <div className={styles.leftDiv}>
            <CategorySelector handleSelectCategory={setSelectedCategory} />
          </div>
        )}
        <div className={styles.rightDiv}>
          <HeartWorkPlace
            categoryObject={categoriesDefinition?.[selectedCategory] || null}
          />
        </div>
      </div>
    </>
  );
}
