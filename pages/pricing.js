import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/Pricing.module.css";
import OnePrice from "../components/pricing/OnePrice";
import SwitchLabels from "../components/Base/Switch";

const Pricing = () => {
  const [isAnnualOrMonthly, setIsAnnualOrMonthly] = useState("Annual");

  return (
    <div className="globalGradient pricing">
      <div className="container">
        <div className={styles.titleContainer}>
          <h1>Pricing</h1>
          <SwitchLabels
            state={isAnnualOrMonthly}
            setState={setIsAnnualOrMonthly}
            state1="Annual"
            state2="Monthly"
            description={isAnnualOrMonthly}
          />
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
