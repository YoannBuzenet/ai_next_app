import React from "react";
import Link from "next/link";
import styles from "../styles/Pricing.module.css";

const Pricing = () => {
  return (
    <div className="globalGradient pricing">
      <div className="container">
        <div className={styles.titleContainer}>
          <h1>Pricing</h1>
        </div>
        <div className={styles.catchphrase}></div>
        <div className={styles.pricesContainer}>
          <div className={styles.onePriceDiv}>Accès gratuit</div>
          <div className={styles.onePriceDiv}>Prix mensuel</div>
          <div className={styles.onePriceDiv}>Accès entreprise</div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
