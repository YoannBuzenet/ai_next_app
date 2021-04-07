import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/BlueCTA.module.css";
import { FormattedMessage } from "react-intl";

const BlueCTA = ({ to, idLabel, defaultLabel }) => {
  return (
    <Link href={to}>
      <a type="button" className={styles.button}>
        <FormattedMessage id={idLabel} defaultMessage={defaultLabel} />
      </a>
    </Link>
  );
};

export default BlueCTA;
