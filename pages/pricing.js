import React from "react";
import Link from "next/link";
import styles from "../styles/Pricing.module.css";

const Pricing = () => {
  return (
    <div className="globalGradient">
      <div>Pricing</div>
      <div className={styles.catchphrase}></div>
      <div className={styles.pricesContainer}>
        <div className={styles.onePriceDiv}></div>
        <div className={styles.onePriceDiv}></div>
        <div className={styles.onePriceDiv}></div>
      </div>
    </div>
  );
};

export default Pricing;
