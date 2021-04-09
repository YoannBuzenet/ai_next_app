import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Pricing.module.css";
import SwitchLabels from "../components/Base/Switch";
import RoundedButton from "../components/Base/RoundedButton";
import BlueCTA from "../components/Base/BlueCTA";
import * as Icon from "react-feather";
import Option from "../components/pricingPage/Option";
import { FormattedMessage, useIntl } from "react-intl";
import { useSession, getSession, signOut } from "next-auth/client";
import UserCheck from "../services/userCheck";
import { FREE_LIMIT_NUMBER_OF_WORDS } from "../config/settings";
import { useRouter } from "next/router";
import axios from "axios";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [session, loading] = useSession();
  const intl = useIntl();

  const router = useRouter();

  const handleButtonSubmit = async (e, action) => {
    e.preventDefault();
    console.log("action", action);

    if (action === "signIn") {
      router.push("/login");
    } else if (action === "upgrade") {
      // Yearly or monthly ?
      // TO DO STRIPE
      // THEN GO TO /subscribeSuccess
    } else if (action === "tryForFree") {
      try {
        const hasUserFreeAccess = await axios.post(`/api/freeAccess`, {
          user: session.user,
        });
        console.log("ça a marché ?", hasUserFreeAccess);
        router.push("/subscribeSuccess");
      } catch (e) {
        // notification
        // TO DO
        console.log("free access didnt work");
      }
    } else if (action === "upgradeEnterprise") {
      // TO DO TYPEFORM / FORM
    }
  };

  const numberOfWordsUsed = session?.user?.totalWordsConsumption;
  const hasUserUsedIsFreeCredit =
    numberOfWordsUsed > FREE_LIMIT_NUMBER_OF_WORDS;
  const isLoggedUser = UserCheck.isUserLogged(session?.user?.isLoggedUntil);
  const isSubbed = UserCheck.isUserSubscribed(session?.user?.isSubscribedUntil);
  const isUserOnFreeAccess = session?.user?.isOnFreeAccess === 1;
  const isUserOnCompanyAccess = session?.user?.isOnCompanyAccess === 1;

  const translatedHead = intl.formatMessage({
    id: "page.pricing.head",
    defaultMessage: "Upgrade your plan",
  });

  return (
    <>
      <Head>{translatedHead}</Head>
      <div className="pricing">
        <div className="container">
          <div className={styles.titleContainer}>
            <h1>
              <FormattedMessage
                id="page.pricing.title"
                defaultMessage="Pricing"
              />
            </h1>
            <div className={styles.catchPhraseContainer}>
              <p>
                <FormattedMessage
                  id="page.pricing.catchprase1"
                  defaultMessage="Write easily with EasyFlow"
                />
              </p>
              {/* <p>
                <FormattedMessage
                  id="page.pricing.catchprase2"
                  defaultMessage="Flexible pricing for all projects"
                />
              </p> */}
            </div>
          </div>
          <div className={styles.switchContainer}>
            <p className={!isAnnual ? styles.selected : styles.nonSelected}>
              <FormattedMessage
                id="page.pricing.PayMonthly"
                defaultMessage="Pay Monthly"
              />
            </p>
            <SwitchLabels
              setState={setIsAnnual}
              state={isAnnual}
              classToAdd="margin20"
            />
            <p className={isAnnual ? styles.selected : styles.nonSelected}>
              <FormattedMessage
                id="page.pricing.PayAnnually"
                defaultMessage="Pay Annually"
              />
            </p>
          </div>
          <div className={styles.firstDivContainer}>
            <div className={styles.catchphrase}></div>
            <div className={styles.pricesContainer}>
              <div className={styles.onePriceDiv1}>
                <div className={styles.topDivWithoutCTA}>
                  <div className={styles.topDiv}>
                    <h2>
                      <FormattedMessage
                        id="page.pricing.FreeTrial"
                        defaultMessage="Free Trial"
                      />
                    </h2>
                    <p className={styles.subTitle}>
                      <FormattedMessage
                        id="page.pricing.Discoverourproduct"
                        defaultMessage="Discover our product"
                      />
                    </p>
                  </div>
                  <div className={styles.priceInfo}>
                    <div className={styles.price}>
                      <span className={styles.priceNumber}>0€</span>
                    </div>
                    <div className={styles.subprice}>
                      <FormattedMessage
                        id="page.pricing.NoCreditCardRequired"
                        defaultMessage="No Credit Card Required"
                      />
                    </div>
                  </div>
                  <div className={styles.optionsContainer}>
                    <Option
                      idOptionLabel="page.pricing.option5000Free"
                      defaultOptionLabel="5,000 free words"
                    />
                    <Option
                      idOptionLabel="page.pricing.accessAllCategories"
                      defaultOptionLabel="Access to all categories"
                    />
                    <Option
                      idOptionLabel="page.pricing.mailSupport"
                      defaultOptionLabel="24/7 email support"
                    />
                  </div>
                </div>
                {isLoggedUser && !isUserOnFreeAccess && !isSubbed && (
                  <BlueCTA
                    to="/"
                    idLabel="page.pricing.tryForFree"
                    defaultLabel="Try for free"
                    isFullWidth
                    handleClick={(e) => {
                      handleButtonSubmit(e, "tryForFree");
                    }}
                  />
                )}
                {/* compter les mots ici */}
                {/* En cours */}
                {isLoggedUser &&
                  isUserOnFreeAccess &&
                  !isSubbed &&
                  hasUserUsedIsFreeCredit && (
                    <BlueCTA
                      to="/"
                      idLabel="page.pricing.onGoing"
                      defaultLabel="Ongoing"
                      isFullWidth
                      disabled
                    />
                  )}
                {/* Fini */}
                {isLoggedUser &&
                  isUserOnFreeAccess &&
                  !hasUserUsedIsFreeCredit &&
                  !isSubbed && (
                    <BlueCTA
                      to="/"
                      idLabel="page.pricing.creditUsed"
                      defaultLabel="Free trial ended"
                      isFullWidth
                      disabled
                    />
                  )}
                {isLoggedUser && isSubbed && (
                  <BlueCTA
                    to="/"
                    idLabel="page.pricing.creditUsed"
                    defaultLabel="Free trial ended"
                    isFullWidth
                    disabled
                  />
                )}
                {!isLoggedUser && (
                  <BlueCTA
                    to="/"
                    idLabel="page.pricing.signIn"
                    defaultLabel="Sign In"
                    isFullWidth
                    handleClick={(e) => {
                      handleButtonSubmit(e, "signIn");
                    }}
                  />
                )}
              </div>
              <div className={styles.onePriceDiv2}>
                <span
                  className={
                    intl.locale === "fr-FR"
                      ? styles.mostPopularFR
                      : styles.mostPopularEN
                  }
                >
                  <FormattedMessage
                    id="page.pricing.mostpopular"
                    defaultMessage="MOST POPULAR"
                  />
                </span>
                <div className={styles.topDivWithoutCTA}>
                  <div className={styles.topDiv}>
                    <h2>
                      <FormattedMessage
                        id="page.pricing.soloAccess"
                        defaultMessage="Solo Access"
                      />
                    </h2>
                    <p className={styles.subTitle}>
                      <FormattedMessage
                        id="page.pricing.Perfectforoneperson"
                        defaultMessage="Perfect for one person"
                      />
                    </p>
                  </div>
                  <div className={styles.priceInfo}>
                    <div className={styles.price}>
                      {isAnnual && (
                        <span className={styles.priceNumber}>
                          35€
                          <span>
                            <FormattedMessage
                              id="page.pricing.byMonth"
                              defaultMessage=" /month"
                            />
                          </span>
                        </span>
                      )}
                      {!isAnnual && (
                        <span className={styles.priceNumber}>49€</span>
                      )}
                    </div>
                    <div className={styles.subprice}>
                      {isAnnual && (
                        <span>
                          <FormattedMessage
                            id="page.pricing.420€BilledYearly"
                            defaultMessage="420€ Billed Yearly"
                          />
                        </span>
                      )}
                      {!isAnnual && (
                        <span>
                          <FormattedMessage
                            id="page.pricing.Billedmonthly"
                            defaultMessage="Billed monthly"
                          />
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={styles.optionsContainer}>
                    <Option
                      idOptionLabel="page.pricing.50000words"
                      defaultOptionLabel="50,000 words/month"
                    />
                    <Option
                      idOptionLabel="page.pricing.accessAllCategories"
                      defaultOptionLabel="Access to all categories"
                    />
                    <Option
                      idOptionLabel="page.pricing.accessPremiumFeatures"
                      defaultOptionLabel="Access to last features"
                    />
                    <Option
                      idOptionLabel="page.pricing.mailSupport"
                      defaultOptionLabel="24/7 email support"
                    />
                  </div>
                </div>
                {isLoggedUser && isSubbed && (
                  <BlueCTA
                    to="/"
                    idLabel="page.pricing.onGoing"
                    defaultLabel="Ongoing"
                    isFullWidth
                    disabled
                  />
                )}
                {isLoggedUser && !isSubbed && (
                  <BlueCTA
                    to="/"
                    idLabel="page.pricing.upgrade"
                    defaultLabel="Upgrade"
                    isFullWidth
                    handleClick={(e) => {
                      handleButtonSubmit(e, "upgrade");
                    }}
                  />
                )}
                {!isLoggedUser && (
                  <BlueCTA
                    to="/"
                    idLabel="page.pricing.signIn"
                    defaultLabel="Sign In"
                    isFullWidth
                    handleClick={(e) => {
                      handleButtonSubmit(e, "signIn");
                    }}
                  />
                )}
              </div>

              <div className={styles.onePriceDiv3}>
                <div className={styles.topDivWithoutCTA}>
                  <div className={styles.topDiv}>
                    <h2>
                      <FormattedMessage
                        id="page.pricing.Entreprise"
                        defaultMessage="Entreprise"
                      />
                    </h2>
                    <p className={styles.subTitle}>
                      <FormattedMessage
                        id="page.pricing.Perfectforteams"
                        defaultMessage="Perfect for teams"
                      />
                    </p>
                  </div>
                  <div className={styles.priceInfo}>
                    <div className={styles.price}>
                      <span className={styles.priceNumber}>
                        <FormattedMessage
                          id="page.pricing.Custom"
                          defaultMessage="Custom"
                        />
                      </span>
                    </div>
                    <div className={styles.subprice}>
                      <FormattedMessage
                        id="page.pricing.Billedmonthly"
                        defaultMessage="Billed monthly"
                      />
                    </div>
                  </div>
                  <div className={styles.optionsContainer}>
                    <Option
                      idOptionLabel="page.pricing.illimitedWords"
                      defaultOptionLabel="Unlimited Words"
                    />
                    <Option
                      idOptionLabel="page.pricing.accessAllCategories"
                      defaultOptionLabel="Access to all categories"
                    />

                    <Option
                      idOptionLabel="page.pricing.accessPremiumFeatures"
                      defaultOptionLabel="Access to premium features"
                    />
                    <Option
                      idOptionLabel="page.pricing.premiumCommunity"
                      defaultOptionLabel="Premium Community (Coming soon)"
                    />
                    <Option
                      idOptionLabel="page.pricing.mailSupport"
                      defaultOptionLabel="24/7 email support"
                    />
                  </div>
                </div>
                {isLoggedUser && (
                  <BlueCTA
                    to="/"
                    idLabel="page.pricing.upgrade"
                    defaultLabel="Upgrade"
                    isFullWidth
                    handleClick={(e) => {
                      handleButtonSubmit(e, "upgradeEnterprise");
                    }}
                  />
                )}
                {!isLoggedUser && (
                  <BlueCTA
                    to="/"
                    idLabel="page.pricing.signIn"
                    defaultLabel="Sign In"
                    isFullWidth
                    handleClick={(e) => {
                      handleButtonSubmit(e, "signIn");
                    }}
                  />
                )}
              </div>
            </div>
            <div className={styles.spaceContainer}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
