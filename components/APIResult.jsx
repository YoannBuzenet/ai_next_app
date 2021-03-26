import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/APIResult.module.css";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import IconButton from "@material-ui/core/IconButton";

const APIResult = ({ index, initialText }) => {
  return (
    <div className={styles.oneResult}>
      <div className={styles.resulText}>{initialText}</div>
      <div className={styles.iconContainer}>
        <IconButton>
          <FileCopyIcon className={styles.icons} />
        </IconButton>
      </div>
    </div>
  );
};

export default APIResult;
