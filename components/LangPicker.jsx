import React from "react";
import Link from "next/link";
import styles from "../styles/LangPicker.module.css";

const LangPicker = ({ langSelected, setLangSelected }) => {
  return (
    <div className={styles.langPickerContainer}>
      <ul>
        <li>English</li>
        <li>French</li>
      </ul>
    </div>
  );
};

export default LangPicker;
