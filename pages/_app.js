import AppWrapper from "../components/AppWrapper";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { useEffect, useContext } from "react";
import Footer from "../components/Footer";
import { useSession, Provider } from "next-auth/client";
import notificationContext from "../contexts/notificationsContext";

function MyApp({ Component, pageProps }) {
  const [session, loading] = useSession();
  const { notificationInfo, setNotificationInfo } = useContext(
    notificationContext
  );

  const [hasUserBeenNotified, setHasUserBeenNotified] = useState(false);

  //useEffect, check le décompte de mots
  // si < X, notification

  //This useEffect will trigger at each rerender
  useEffect(() => {
    if (!hasUserBeenNotified) {
      return;
    }
    if (
      session?.user?.totalMaxWordsUserThisMonth -
        session?.user?.consumptionThisMonth <
      0
    ) {
      console.log("consommation terminée");
      setHasUserBeenNotified(true);
    } else if (
      session?.user?.totalMaxWordsUserThisMonth -
        session?.user?.consumptionThisMonth <
      2000
    ) {
      console.log("consommation presque terminée");
      setHasUserBeenNotified(true);
    } else {
      console.log("consommation ok");
      setHasUserBeenNotified(true);
    }
  });

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
