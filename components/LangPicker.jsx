import React from "react";
import Link from "next/link";
import styles from "../styles/LangPicker.module.css";
import OneLang from "./inputLangChoice/OneLang";

const LangPicker = ({
  langSelected,
  setLangSelected,
  setIsDisplayedLangPicker,
}) => {
  const handleClick = (e, lang) => {
    setLangSelected(lang);
  };

  return (
    <div className={styles.langPickerContainer}>
      <ul>
        <OneLang
          handleClick
          langSelected={langSelected}
          handleClick={handleClick}
          langKey="en-US"
          langName="English"
        />
        <OneLang
          handleClick
          langSelected={langSelected}
          handleClick={handleClick}
          langKey="fr-FR"
          langName="French"
        />
      </ul>
    </div>
  );
};

export default LangPicker;
