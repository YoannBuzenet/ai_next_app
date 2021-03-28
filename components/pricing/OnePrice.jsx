import React from "react";
import Link from "next/link";
import styles from "../../styles/OnePrice.module.css";

const OnePrice = ({ price, explaination }) => {
  return <div className={styles.onePriceDiv}>{explaination}</div>;
};

export default OnePrice;
