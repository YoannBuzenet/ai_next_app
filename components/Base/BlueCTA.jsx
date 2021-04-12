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
  disableMarginTop = false,
}) => {
  const widthButton = isFullWidth
    ? styles.buttonContainerFullWidth
    : styles.buttonContainer;

  const addedStyle = disableMarginTop ? { marginTop: 0 } : {};

  if (!disabled) {
    return (
      <div className={widthButton} style={addedStyle}>
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
