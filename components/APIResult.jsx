import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/APIResult.module.css";
import FileCopyIcon from "@material-ui/icons/FileCopy";

const APIResult = ({ index, initialText }) => {
  return (
    <div className={styles.oneResult}>
      <div className={styles.resulText}>{initialText}</div>
      <div className={styles.iconContainer}>
        <FileCopyIcon className={styles.icons} />
      </div>
    </div>
  );
};

export default APIResult;
