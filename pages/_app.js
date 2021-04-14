import AppWrapper from "../components/AppWrapper";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { useEffect, useContext, useState } from "react";
import Footer from "../components/Footer";
import { useSession, Provider } from "next-auth/client";
import notificationContext from "../contexts/notificationsContext";
import UserCheck from "../services/userCheck";

function MyApp({ Component, pageProps }) {
  const [session, loading] = useSession();
  const { notificationInfo, setNotificationInfo } = useContext(
    notificationContext
  );

  const isSubbed = UserCheck.isUserSubscribed(session?.user?.isSubscribedUntil);

  useEffect(() => {
    if (!isSubbed) {
      return;
    }
    if (
      session?.user?.totalMaxWordsUserThisMonth -
        session?.user?.consumptionThisMonth <
      0
    ) {
      console.log("consommation terminée");
    } else if (
      session?.user?.totalMaxWordsUserThisMonth -
        session?.user?.consumptionThisMonth <
      2000
    ) {
      console.log("consommation presque terminée");
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
