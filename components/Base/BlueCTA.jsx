import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/BlueCTA.module.css";
import { FormattedMessage } from "react-intl";

const BlueCTA = ({
  to,
  idLabel,
  defaultLabel,
  handleClick,
  disabled = false,
  isFullWidth = false,
}) => {
  const widthButton = isFullWidth
    ? styles.buttonContainerFullWidth
    : styles.buttonContainer;

  if (!disabled) {
    return (
      <div className={widthButton}>
        <Link href={to}>
          <a type="button" className={styles.button} onClick={handleClick}>
            <FormattedMessage id={idLabel} defaultMessage={defaultLabel} />
          </a>
        </Link>
      </div>
    );
  } else {
    return (
      <div className={widthButton}>
        <span
          type="button"
          className={styles.disabledButton}
          onClick={handleClick}
        >
          <FormattedMessage id={idLabel} defaultMessage={defaultLabel} />
        </span>
      </div>
    );
  }
};

export default BlueCTA;
