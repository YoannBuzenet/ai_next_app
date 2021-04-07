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
            <div className={styles.onePriceDiv1}>
              <div className={styles.topDiv}>
                <h2>Free Trial</h2>
                <p className={styles.subTitle}>ddddd</p>
              </div>
              <div className={styles.priceInfo}>
                <div className={styles.price}>0€</div>
                <div className={styles.subprice}></div>
              </div>
            </div>
            <div className={styles.onePriceDiv2}>
              <div className={styles.topDiv}>
                <h2>Solo Access</h2>
                <p className={styles.subTitle}>ddddd</p>
              </div>
              <div className={styles.priceInfo}>
                <div className={styles.price}>35€</div>
                <div className={styles.subprice}></div>
              </div>
            </div>

            <div className={styles.onePriceDiv3}>
              <div className={styles.topDiv}>
                <h2>Entreprise</h2>
                <p className={styles.subTitle}>ddddd</p>
              </div>
              <div className={styles.priceInfo}>
                <div className={styles.price}>Custom</div>
                <div className={styles.subprice}></div>
              </div>
            </div>
          </div>
          <div className={styles.spaceContainer}></div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
