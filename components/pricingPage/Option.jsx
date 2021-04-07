import React, { useState } from "react";
import * as Icon from "react-feather";
import styles from "../../styles/Option.module.css";
import { FormattedMessage } from "react-intl";

const Option = ({ idOptionLabel = "d", defaultOptionLabel = "ok" }) => {
  //
  return (
    <div className={styles.optionContainer}>
      <Icon.CheckCircle className={styles.checkIcon} />
      <p>
        <FormattedMessage
          id={idOptionLabel}
          defaultMessage={defaultOptionLabel}
        />
      </p>
    </div>
  );
};

export default Option;
