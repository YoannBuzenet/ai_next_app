import Head from "next/head";
import Link from "next/link";
import CategorySelector from "../components/CategorySelector";
import { useSession, getSession } from "next-auth/client";
import { useContext, useState } from "react";
import userContextFile from "../contexts/userContext";
import styles from "../styles/Workplace.module.css";
import { categoriesDefinition } from "../definitions/categories";
import HeartWorkPlace from "../components/HeartWorkPlace";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export default function Workplace() {
  // TODO 2nd step
  // Checker si logé, sinon redirect
  // si on start avec isMobile = true, isDisplayedTools est true et le bouton pour le cacher disparait

  const { userContext } = useContext(userContextFile);
  const [session, loading] = useSession();

  const [isDisplayedTools, setIsDisplayedTools] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userInputs, setUserInputs] = useState({});
  const [AIResults, setAIResults] = useState(["test", "test2"]);

  const sendDataToBackEnd = () => {
    let arrayofuserInputs = [];
    for (const userInput in userInputs) {
      arrayofuserInputs = [
        ...arrayofuserInputs,
        { [userInput]: userInputs[userInput] },
      ];
    }
    const finalPayload = {
      categoryID: selectedCategory,
      userInputs: arrayofuserInputs,
    };
    console.log("we build the final payload here. Here :", finalPayload);
    console.log("pinging the back end...");
  };

  const resetUserInputs = () => {
    setUserInputs({});
  };

  console.log("user inputs", userInputs);

  return (
    <>
      <div className={styles.workplaceMenu}>
        <div>
          {isDisplayedTools && (
            <ArrowBackIosIcon style={{ marginTop: "1px", marginLeft: "5px" }} />
          )}
          <p onClick={(e) => setIsDisplayedTools(!isDisplayedTools)}>
            {isDisplayedTools ? "Hide categories" : "Display categories"}
          </p>
          {!isDisplayedTools && (
            <ArrowForwardIosIcon
              style={{ marginTop: "1px", marginLeft: "5px" }}
            />
          )}
        </div>
      </div>
      <div className={styles.workToolsglobalContainer}>
        {isDisplayedTools && (
          <div className={styles.leftDiv}>
            <CategorySelector
              handleSelectCategory={setSelectedCategory}
              resetUserInputs={resetUserInputs}
            />
          </div>
        )}
        <div className={styles.rightDiv}>
          <HeartWorkPlace
            categoryObject={categoriesDefinition?.[selectedCategory] || null}
            sendDataToBackEnd={sendDataToBackEnd}
            userInputs={userInputs}
            setUserInputs={setUserInputs}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </>
  );
}
