import Head from "next/head";
import Link from "next/link";
import { useSession, getSession, signOut } from "next-auth/client";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/MyAccount.module.css";
import UserCheck from "../services/userCheck";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { FormattedMessage, useIntl } from "react-intl";
import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import axios from "axios";
import MyResponsiveLine from "../components/Base/Charts/ResponsiveChartLine";
import { generateObjectWithdates } from "../services/utils";
import ProgressBar from "../components/Base/Progress";
import { FREE_LIMIT_NUMBER_OF_WORDS } from "../config/settings";
import getStripe from "../services/getStripe";
import BlueCTA from "../components/Base/BlueCTA";
import { products } from "../config/products";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const isLoggedUser = UserCheck.isUserLogged(session?.user?.isLoggedUntil);
  if (!isLoggedUser) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  } else {
    return { props: {} };
  }
}

export default function MyAccount() {
  const [session, loading] = useSession();
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const [value, setValue] = useState(0);
  const [data7DaysConsumption, setData7DaysConsumption] = useState([]);
  const intl = useIntl();
  const [userTotalConsumption, setUserTotalConsumption] = useState("");
  const [userMonthlyConsumption, setUserMonthlyConsumption] = useState(0);

  const isUserSubd = UserCheck.isUserSubscribed(
    session?.user?.isSubscribedUntil
  );

  //TO DO
  const maxWordsUser = "";

  console.log("session", session);
  console.log("is user subbed", isUserSubd);

  useEffect(() => {
    setIsLoadingUserData(true);
    axios.post(`/api/numberOfWords/7daysData`, { session }).then((resp) => {
      const data = resp.data.dataFor7days.map((oneDay) => ({
        x: oneDay.date,
        y: oneDay.amount,
      }));

      console.log("fresh data", data);

      // check for each one if we have data, if not we create an object with 0
      // complete array is displayed
      const arrayWithLast7dates = generateObjectWithdates(7);

      let completedData = [];

      for (let i = 0; i < arrayWithLast7dates.length; i++) {
        const possibleExistingData = data.find(
          (oneDay) => oneDay.x === arrayWithLast7dates[i].date
        );

        if (possibleExistingData !== undefined) {
          completedData = [...completedData, possibleExistingData];
        } else {
          completedData = [
            ...completedData,
            {
              x: arrayWithLast7dates[i].date,
              y: 0,
            },
          ];
        }
      }

      const arrayWithFormattedDate = completedData.map((object) => ({
        ...object,
        x: intl.formatDate(new Date(object.x), {
          month: "numeric",
          day: "numeric",
          format: "short",
        }),
      }));

      const transatedDailyUse = intl.formatMessage({
        id: "compo.chart.dailyUse",
        defaultMessage: "Daily Use",
      });

      const dataForChart = [
        {
          data: arrayWithFormattedDate,
          color: "hsl(231, 48%, 48%)",
          id: transatedDailyUse,
        },
      ];
      setData7DaysConsumption(dataForChart);
      setIsLoadingUserData(false);
    });

    axios
      .post(`/api/numberOfWords/userTotalConsumption`, { session })
      .then((resp) => {
        setUserTotalConsumption(resp.data?.userTotalConsumption);
      });
    axios

      .post(`/api/numberOfWords/thisMonthConsumption`, { session })
      .then((resp) => {
        setUserMonthlyConsumption(resp.data?.dataForCurrentMonth.totalAmount);
      });
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: process.env.NEXT_PUBLIC_URL_ABSOLUTE_THIS_WEBSITE });
  };

  const handleBuyReload = async (e) => {
    e.preventDefault();
    const stripe = await getStripe();

    const paymentCall = await axios
      .post("/api/payment/stripe", {
        priceId: products.boost.stripeId,
        mode: "payment",
      })
      .then((data) => {
        // Call Stripe.js method to redirect to the new Checkout page
        console.log("datas", data);
        stripe
          .redirectToCheckout({
            sessionId: data.data.sessionId,
          })
          .then((result) => console.log("result stripe", result));
      });
  };

  const useStyles = makeStyles((theme) => ({
    button: {
      color: "white",
      fontWeight: 400,
      fontSize: 16,
      textTransform: "none",
      backgroundColor: "#f02213",
      "&:hover": {
        backgroundColor: "#b81004",
        boxShadow: "none",
      },
    },
    root: {
      flexGrow: 1,
      boxShadow: 0,
    },
    tabs: {
      backgroundColor: "white",
      color: "black",
    },
    tab: {
      textTransform: "none",
      fontSize: "1.6rem",
    },
    box: {},
    typo: {
      fontSize: "1.4rem",
    },
  }));

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3} className={classes.box}>
            <Typography className={classes.typo}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  // Translations
  const translatedSession = intl.formatMessage({
    id: "page.myAccount.session",
    defaultMessage: "Session",
  });
  const translatedUsageAndBilling = intl.formatMessage({
    id: "page.myAccount.useageAndBilling",
    defaultMessage: "Usage and Billing",
  });
  const translatedPageTitle = intl.formatMessage({
    id: "page.myAccount.head",
    defaultMessage: "My Account",
  });

  return (
    <>
      <Head>
        <title>{translatedPageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.myAccountContainer}>
        <div className="">
          <div className="container">
            <main className={styles.main}>
              <div className={styles.title}>
                <h1>
                  <FormattedMessage
                    id="page.myAccount.title"
                    defaultMessage="My Account"
                  />
                </h1>
              </div>
              <div className={styles.tabContainer}>
                <div className={classes.root}>
                  <AppBar position="static" elevation={0}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="simple tabs example"
                      className={classes.tabs}
                      indicatorColor="primary"
                    >
                      <Tab
                        disableRipple
                        label={translatedUsageAndBilling}
                        {...a11yProps(1)}
                        className={classes.tab}
                      />
                      <Tab
                        disableRipple
                        label={translatedSession}
                        {...a11yProps(0)}
                        className={classes.tab}
                      />
                      {/* <Tab
                      label="Item Three"
                      {...a11yProps(2)}
                      className={classes.tab}
                    /> */}
                    </Tabs>
                  </AppBar>

                  <TabPanel value={value} index={0}>
                    {/* {isLoadingUserData && (
                    <div className={styles.loaderContainer}>
                      <ResponsiveArticle />
                    </div>
                  )} */}

                    {!isLoadingUserData && (
                      <>
                        <div className={styles.chartContainer}>
                          <MyResponsiveLine
                            height={500}
                            width={850}
                            data={data7DaysConsumption}
                          />
                        </div>
                        <div className={styles.userTotalConsumption}>
                          <p className={styles.totalWords}>
                            <FormattedMessage
                              id="page.myAccount.useageAndBilling.usage.youUsed"
                              defaultMessage="Vous have used "
                            />
                            <strong>{userTotalConsumption || 0}</strong>
                            <FormattedMessage
                              id="page.myAccount.useageAndBilling.usage.wordsSinceAccountCreation"
                              defaultMessage=" words since your account creation."
                            />
                          </p>
                          <div className={styles.usageDiv}>
                            <h2>
                              <FormattedMessage
                                id="page.myAccount.useageAndBilling.usage.title"
                                defaultMessage="Usage"
                              />
                            </h2>
                            <div className={styles.progressBarTitle}>
                              <p>
                                <FormattedMessage
                                  id="page.myAccount.useageAndBilling.usage.totalCreditsUsedThisMonth"
                                  defaultMessage="Total words used this month"
                                />
                              </p>
                              <p className={styles.wordsCounter}>
                                {userTotalConsumption || 0} / 5,000
                              </p>
                            </div>
                            <div className={styles.progressContainer}>
                              <ProgressBar
                                progress={(userTotalConsumption / 5000) * 100}
                              />
                            </div>
                          </div>
                          <div className={styles.subscriptionDiv}>
                            <h2>
                              <FormattedMessage
                                id="page.myAccount.useageAndBilling.subscription.title"
                                defaultMessage="Subscription"
                              />
                            </h2>
                          </div>
                          <p>
                            <FormattedMessage
                              id="page.myAccount.useageAndBilling.subscription.status.freeAccess"
                              defaultMessage="You are currently in free trial access."
                            />
                          </p>
                          {session?.user?.isOnFreeAccess === 1 &&
                            session?.wordsTotalConsumption
                              ?.userTotalConsumption >
                              FREE_LIMIT_NUMBER_OF_WORDS && (
                              <div className={styles.freeAccessOver}>
                                <p>
                                  <FormattedMessage
                                    id="page.myAccount.useageAndBilling.subscription.status.freeAccess.isOver"
                                    defaultMessage="You reach your maximum free use access."
                                  />
                                </p>
                                <p>
                                  <FormattedMessage
                                    id="page.myAccount.useageAndBilling.subscription.status.freeAccess.pleaseContactUs"
                                    defaultMessage="Please contact us to subscribe to our service."
                                  />
                                </p>
                              </div>
                            )}
                          {/* TO DO remove le ! */}
                          {!isUserSubd && (
                            <div className={styles.reloadDiv}>
                              <h2>
                                <FormattedMessage
                                  id="page.myAccount.useageAndBilling.reload"
                                  defaultMessage="Reload"
                                />
                              </h2>
                              <div className={styles.CTAAndTextContainer}>
                                <div>
                                  <p className={styles.reloadPriceParagraph}>
                                    <FormattedMessage
                                      id="page.myAccount.useageAndBilling.reload.ExplainationText"
                                      defaultMessage="19€ for a 20,000 extra words"
                                    />
                                  </p>
                                  <p
                                    className={
                                      styles.reloadPriceDurationParagraph
                                    }
                                  >
                                    <FormattedMessage
                                      id="page.myAccount.useageAndBilling.reload.ExplainationText.duration"
                                      defaultMessage="Lasts 30 days"
                                    />
                                  </p>
                                </div>
                                <BlueCTA
                                  to="/"
                                  idLabel="page.myAccount.useageAndBilling.reload.CTA"
                                  defaultLabel="Buy"
                                  handleClick={(e) => {
                                    handleBuyReload(e);
                                  }}
                                  disableMarginTop
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <div className={styles.signOutContainer}>
                      <p>
                        <FormattedMessage
                          id="page.myAccount.logOutLabel"
                          defaultMessage="Log out Account"
                        />
                      </p>
                      <Button
                        onClick={handleSignOut}
                        className={classes.button}
                        variant="contained"
                        size="large"
                      >
                        <FormattedMessage
                          id="page.myAccount.logOugButton"
                          defaultMessage="Sign Out"
                        />
                      </Button>
                    </div>
                  </TabPanel>
                  {/* <TabPanel value={value} index={2}>
                  
                </TabPanel> */}
                </div>
              </div>
              <div className=""></div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
