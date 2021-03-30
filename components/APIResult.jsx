import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/APIResult.module.css";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";

const APIResult = ({ index, initialText, createRequestFromResults }) => {
  const [currentText, setCurrentText] = useState(initialText);

  const useStyles = makeStyles((theme) => ({
    button: {
      color: "white",
      marginLeft: "10px",
      fontWeight: 500,
      fontSize: 16,
      textTransform: "none",
      backgroundColor: "#1c64f2",
      maxHeight: "60.75px",
      "&:hover": {
        backgroundColor: "#1b58d1",
        boxShadow: "none",
      },
    },
  }));

  const classes = useStyles();

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
          rows={currentText.length / 90 + 1}
          multiline={currentText.length > 90}
        />
      </div>
      <div className={styles.allResultCTAContainer}>
        <div className={styles.iconContainer}>
          <IconButton
            onClick={(e) => navigator.clipboard.writeText(currentText)}
          >
            <FileCopyIcon className={styles.icons} />
          </IconButton>
        </div>
        <div className={styles.makeMoreContainer}>
          <Button
            className={classes.button}
            variant="contained"
            size="large"
            onClick={(e) => createRequestFromResults(e, currentText)}
          >
            <FormattedMessage
              id="compo.apiResult.makeMore"
              defaultMessage="Make More"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default APIResult;
