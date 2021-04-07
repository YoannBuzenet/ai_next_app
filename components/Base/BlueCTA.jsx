import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/BlueCTA.module.css";
import { FormattedMessage } from "react-intl";

const BlueCTA = ({ to, idLabel, defaultLabel, isFullWidth = false }) => {
  const widthButton = isFullWidth
    ? styles.buttonContainerFullWidth
    : styles.buttonContainer;

  return (
    <div className={widthButton}>
      <Link href={to}>
        <a type="button" className={styles.button}>
          <FormattedMessage id={idLabel} defaultMessage={defaultLabel} />
        </a>
      </Link>
    </div>
  );
};

export default BlueCTA;
