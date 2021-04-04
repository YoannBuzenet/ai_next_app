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

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   const isLoggedUser = UserCheck.isUserLogged(session?.user?.isLoggedUntil);
//   if (!isLoggedUser) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//       props: {},
//     };
//   } else {
//     return { props: {} };
//   }
// }

export default function MyAccount() {
  const [session, loading] = useSession();
  const [value, setValue] = useState(0);
  const [data7DaysConsumption, setData7DaysConsumption] = useState([]);
  const intl = useIntl();

  useEffect(() => {
    axios.post(`/api/numberOfWords/`, { session }).then((resp) => {
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

      const dataForChart = [
        {
          data: arrayWithFormattedDate,
          color: "hsl(231, 48%, 48%)",
          id: "Daily Use",
        },
      ];
      setData7DaysConsumption(dataForChart);
    });
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: process.env.NEXT_PUBLIC_URL_ABSOLUTE_THIS_WEBSITE });
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
      backgroundColor: "white",
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

  return (
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
                      label={translatedSession}
                      {...a11yProps(0)}
                      className={classes.tab}
                    />
                    <Tab
                      disableRipple
                      label={translatedUsageAndBilling}
                      {...a11yProps(1)}
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
                <TabPanel value={value} index={1}>
                  <div className={styles.chartContainer}>
                    <MyResponsiveLine
                      height={500}
                      width={900}
                      data={data7DaysConsumption}
                    />
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
  );
}
