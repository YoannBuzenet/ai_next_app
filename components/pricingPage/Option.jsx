import React, { useState } from "react";
import * as Icon from "react-feather";
import styles from "../../styles/Option.module.css";

const Option = () => {
  //
  return (
    <div className={styles.optionContainer}>
      <Icon.CheckCircle className={styles.checkIcon} />
      <p>options</p>
    </div>
  );
};

export default Option;
