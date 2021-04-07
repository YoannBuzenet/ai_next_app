import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/Pricing.module.css";
import OnePrice from "../components/pricing/OnePrice";
import SwitchLabels from "../components/Base/Switch";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="pricing">
      <div className="container">
        <div className={styles.titleContainer}>
          <h1>Pricing</h1>
          <div className={styles.switchContainer}>
            Monthly
            <SwitchLabels setState={setIsAnnual} state={isAnnual} />
            Annually
          </div>
        </div>
        <div className={styles.catchphrase}></div>
        <div className={styles.pricesContainer}>
          <OnePrice explaination="Accès gratuit" />
          <OnePrice explaination="Prix mensuel" />
          <OnePrice explaination="Accès entreprise" />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
