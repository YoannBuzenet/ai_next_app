import AppWrapper from "../components/AppWrapper";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { useEffect, useContext, useState } from "react";
import Footer from "../components/Footer";
import { useSession, Provider } from "next-auth/client";
import notificationContext from "../contexts/notificationsContext";
import UserCheck from "../services/userCheck";
import { useIntl } from "react-intl";

function MyApp({ Component, pageProps }) {
  const [session, loading] = useSession();
  const { notificationInfo, setNotificationInfo } = useContext(
    notificationContext
  );

  const Intl = useIntl();

  const isSubbed = UserCheck.isUserSubscribed(session?.user?.isSubscribedUntil);

  // TRANSLATIONS
  const translatedInfoLess2000WordsMessage = Intl.formatMessage({
    id: "notification.remainingConsoUnder2000words",
    defaultMessage:
      "There are less than 2,000 words remaining in your credit this month. If needed, you can purchase additional credits in My Account.",
  });
  const translatedInfonoMoreCreditMessage = Intl.formatMessage({
    id: "notification.remainingConsoat0",
    defaultMessage:
      "All your credits have been used this month. If needed, you can purchase additional credits in My Account.",
  });

  useEffect(() => {
    if (!isSubbed) {
      return;
    }
    if (
      session?.user?.totalMaxWordsUserThisMonth -
        session?.user?.consumptionThisMonth <=
      0
    ) {
      console.log("consommation terminée");
      setNotificationInfo({
        ...notificationInfo,
        alert: {
          ...notificationInfo.alert,
          message: translatedInfonoMoreCreditMessage,
          severity: "info",
        },
        snackbar: {
          ...notificationInfo.snackbar,
          isDisplayed: true,
        },
      });
    } else if (
      session?.user?.totalMaxWordsUserThisMonth -
        session?.user?.consumptionThisMonth <
      2000
    ) {
      console.log("consommation presque terminée");
      setNotificationInfo({
        ...notificationInfo,
        alert: {
          ...notificationInfo.alert,
          message: translatedInfoLess2000WordsMessage,
          severity: "info",
        },
        snackbar: {
          ...notificationInfo.snackbar,
          isDisplayed: true,
        },
      });
    } else {
      console.log("consommation ok");
    }
  }, [session?.user?.monthlyWordsConsumption]);

  return (
    <AppWrapper>
      <Provider session={pageProps.session}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </AppWrapper>
  );
}

export default MyApp;
