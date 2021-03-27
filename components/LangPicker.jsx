import React from "react";
import Link from "next/link";
import styles from "../styles/LangPicker.module.css";

const LangPicker = ({
  langSelected,
  setLangSelected,
  setIsDisplayedLangPicker,
}) => {
  const handleClick = (e, lang) => {
    setLangSelected(lang);
    setIsDisplayedLangPicker(false);
  };

  return (
    <div className={styles.langPickerContainer}>
      <ul>
        <li onClick={() => handleClick("en-US")}>
          <p>English</p>
        </li>
        <li onClick={() => handleClick("fr-FR")}>
          <p>French</p>
        </li>
      </ul>
    </div>
  );
};

export default LangPicker;
