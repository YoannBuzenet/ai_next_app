import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/Pricing.module.css";
import SwitchLabels from "../components/Base/Switch";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  // to do translate le nom de la page

  return (
    <div className="pricing">
      <div className="container">
        <div className={styles.titleContainer}>
          <h1>Pricing</h1>
          <div className={styles.switchContainer}>
            Pay Monthly
            <SwitchLabels setState={setIsAnnual} state={isAnnual} />
            Pay Annually
          </div>
        </div>
        <div className={styles.firstDivContainer}>
          <div className={styles.catchphrase}></div>
          <div className={styles.pricesContainer}>
            <div className={styles.onePriceDiv}>"d"</div>
            <div className={styles.onePriceDiv}>"d"</div>
            <div className={styles.onePriceDiv}>"d"</div>
          </div>
          <div className={styles.spaceContainer}></div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
