import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/APIResult.module.css";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

const APIResult = ({ index, initialText }) => {
  const [currentText, setCurrentText] = useState(initialText);

  return (
    <div className={styles.oneResult} key={index}>
      <div className={styles.resulTextContainer}>
        <TextField
          InputProps={{ style: { fontSize: 20 } }}
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          fullWidth
          variant="outlined"
          className={styles.resulText}
          rows={currentText.length / 100 + 1}
          multiline={currentText.length > 100}
        />
      </div>
      <div className={styles.iconContainer}>
        <IconButton onClick={(e) => navigator.clipboard.writeText(currentText)}>
          <FileCopyIcon className={styles.icons} />
        </IconButton>
      </div>
    </div>
  );
};

export default APIResult;
