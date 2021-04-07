import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/Pricing.module.css";
import SwitchLabels from "../components/Base/Switch";
import RoundedButton from "../components/Base/RoundedButton";
import BlueCTA from "../components/Base/BlueCTA";
import * as Icon from "react-feather";
import Option from "../components/pricingPage/Option";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  // to do translate le nom de la page

  console.log("bru", Icon);

  return (
    <div className="pricing">
      <div className="container">
        <div className={styles.titleContainer}>
          <h1>Pricing</h1>
          <div className={styles.catchPhraseContainer}>
            <p>Slogan stylé</p>
            <p>Try for free</p>
          </div>
        </div>
        <div className={styles.switchContainer}>
          <p className={!isAnnual ? styles.selected : styles.nonSelected}>
            Pay Monthly
          </p>
          <SwitchLabels
            setState={setIsAnnual}
            state={isAnnual}
            classToAdd="margin20"
          />
          <p className={isAnnual ? styles.selected : styles.nonSelected}>
            Pay Annually
          </p>
        </div>
        <div className={styles.firstDivContainer}>
          <div className={styles.catchphrase}></div>
          <div className={styles.pricesContainer}>
            <div className={styles.onePriceDiv1}>
              <div className={styles.topDivWithoutCTA}>
                <div className={styles.topDiv}>
                  <h2>Free Trial</h2>
                  <p className={styles.subTitle}>Discover our product</p>
                </div>
                <div className={styles.priceInfo}>
                  <div className={styles.price}>
                    <span className={styles.priceNumber}>0€</span>
                  </div>
                  <div className={styles.subprice}>No Credit Card Required</div>
                </div>
                <div className={styles.optionsContainer}>
                  <Option />
                  <Option />
                  <Option />
                </div>
              </div>
              <BlueCTA
                to="/"
                idLabel="page.pricing.cta"
                defaultLabel="Try"
                isFullWidth
              />
            </div>
            <div className={styles.onePriceDiv2}>
              <div className={styles.topDivWithoutCTA}>
                <div className={styles.topDiv}>
                  <h2>Solo Access</h2>
                  <p className={styles.subTitle}>Perfect for one person</p>
                </div>
                <div className={styles.priceInfo}>
                  <div className={styles.price}>
                    {isAnnual && (
                      <span className={styles.priceNumber}>
                        35€<span> /month</span>
                      </span>
                    )}
                    {!isAnnual && (
                      <span className={styles.priceNumber}>49€</span>
                    )}
                  </div>
                  <div className={styles.subprice}>
                    {isAnnual && <span>420€ Billed Yearly</span>}
                    {!isAnnual && <span>Billed monthly</span>}
                  </div>
                </div>
                <div className={styles.optionsContainer}>
                  <Option />
                  <Option />
                  <Option />
                  <Option />
                  <Option />
                </div>
              </div>
              <BlueCTA
                to="/"
                idLabel="page.pricing.cta"
                defaultLabel="Try"
                isFullWidth
              />
            </div>

            <div className={styles.onePriceDiv3}>
              <div className={styles.topDivWithoutCTA}>
                <div className={styles.topDiv}>
                  <h2>Entreprise</h2>
                  <p className={styles.subTitle}>Perfect for teams</p>
                </div>
                <div className={styles.priceInfo}>
                  <div className={styles.price}>
                    <span className={styles.priceNumber}>Custom</span>
                  </div>
                  <div className={styles.subprice}>Billed Monthly</div>
                </div>
                <div className={styles.optionsContainer}>
                  <Option />
                  <Option />
                  <Option />
                  <Option />
                  <Option />
                  <Option />
                </div>
              </div>
              <BlueCTA
                to="/"
                idLabel="page.pricing.cta"
                defaultLabel="Try"
                isFullWidth
              />
            </div>
          </div>
          <div className={styles.spaceContainer}></div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
