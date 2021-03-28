import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import CategorySelector from "../components/CategorySelector";
import { useSession, getSession } from "next-auth/client";
import { useContext, useState } from "react";
import userContextFile from "../contexts/userContext";
import styles from "../styles/WorkPlace.module.css";
import { categoriesDefinition } from "../definitions/categories";
import HeartWorkPlace from "../components/HeartWorkPlace";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import APIResult from "../components/APIResult";
import UserCheck from "../services/userCheck";
import axios from "axios";
import LangPicker from "../components/LangPicker";
import { langDictionnary } from "../definitions/langDictionnary";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  //TODO STEP2 : check if Subscribed too
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

function Workplace() {
  // TODO 2nd step
  // si on start avec isMobile = true, isDisplayedTools est true et le bouton pour le cacher disparait
  const { userContext } = useContext(userContextFile);
  const [session, loading] = useSession();
  const [isLoadingAPIResults, setIsLoadingAPIResults] = useState(false);
  const [isDisplayedTools, setIsDisplayedTools] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userInputs, setUserInputs] = useState({});
  const [AIResults, setAIResults] = useState([]);
  const [langSelected, setLangSelected] = useState("en-US");
  const [isDisplayedLangPicker, setIsDisplayedLangPicker] = useState(false);

  console.log("our ai results", AIResults);

  const sendDataToBackEnd = async () => {
    setIsLoadingAPIResults(true);
    setAIResults([]);
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
      lang: langSelected,
      user: session.user,
    };
    console.log("we build the final payload here. Here :", finalPayload);
    axios
      .post("/api/creation", finalPayload)
      .then((resp) => {
        console.log("resp after posting to next API", resp);
        setAIResults([...resp.data.response]);
        setIsLoadingAPIResults(false);
      })
      .catch((err) => {
        console.log("error after posting to next", err);
        setIsLoadingAPIResults(false);
      });
  };

  const createRequestFromResults = async (e, textToSend) => {
    setIsLoadingAPIResults(true);

    const numberOfInputsInCategory =
      categoriesDefinition[selectedCategory].inputs.length;

    const userInputsCopy = { ...userInputs };

    if (numberOfInputsInCategory === 1) {
      userInputsCopy.value = textToSend;
    } else {
      userInputsCopy.value2 = textToSend;
    }

    let arrayofuserInputs = [];
    for (const userInput in userInputsCopy) {
      arrayofuserInputs = [
        ...arrayofuserInputs,
        { [userInput]: userInputsCopy[userInput] },
      ];
    }

    const finalPayload = {
      categoryID: selectedCategory,
      userInputs: arrayofuserInputs,
      lang: langSelected,
      user: session.user,
    };

    axios
      .post("/api/creation", finalPayload)
      .then((resp) => {
        console.log("resp after posting REMATCH to next API", resp);
        setAIResults([...AIResults, ...resp.data.response]);
        setIsLoadingAPIResults(false);
      })
      .catch((err) => {
        console.log("error after posting to next", err);
        setIsLoadingAPIResults(false);
      });
  };

  const resetUserInputs = () => {
    setUserInputs({});
    setAIResults([]);
  };

  console.log("user inputs", userInputs);
  console.log("lang selected", langSelected);

  return (
    <div className={styles.workplaceContainer}>
      <div className={styles.workplaceMenu}>
        <div>
          {isDisplayedTools && (
            <ArrowBackIosIcon
              style={{ marginTop: "1px", marginLeft: "5px" }}
              onClick={(e) => setIsDisplayedTools(!isDisplayedTools)}
            />
          )}
          <p
            className={styles.categorySelector}
            onClick={(e) => setIsDisplayedTools(!isDisplayedTools)}
          >
            {isDisplayedTools ? "Hide categories" : "Display categories"}
          </p>
          {!isDisplayedTools && (
            <ArrowForwardIosIcon
              style={{ marginTop: "1px", marginLeft: "5px" }}
              onClick={(e) => setIsDisplayedTools(!isDisplayedTools)}
            />
          )}
        </div>
        <div
          className={styles.workplaceMenuLangPicker}
          onMouseEnter={() => setIsDisplayedLangPicker(true)}
          onMouseLeave={() => setIsDisplayedLangPicker(false)}
          // Do activate this feature only on mobile
        >
          <p>
            Input & Output Language :{" "}
            <span className={styles.selectedLangBold}>
              {langDictionnary[langSelected]}
            </span>
          </p>
          <KeyboardArrowDownIcon
            style={{ marginTop: "1px", marginLeft: "5px" }}
          />
          {isDisplayedLangPicker && (
            <LangPicker
              langSelected={langSelected}
              setLangSelected={setLangSelected}
              setIsDisplayedLangPicker={setIsDisplayedLangPicker}
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
            isLoadingAPIResults={isLoadingAPIResults}
          />
          {/* API Result display */}
          {Array.isArray(AIResults) && AIResults.length > 0 && (
            <div className={styles.resultsDivContainer}>
              <div className={styles.resultTitle}>
                <h1>Results</h1>
                {AIResults.map((result, index) => (
                  <APIResult
                    index={index}
                    initialText={result}
                    createRequestFromResults={createRequestFromResults}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Workplace;
