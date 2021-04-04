import AppWrapper from "../components/AppWrapper";
import "../styles/globals.css";
import { Provider } from "next-auth/client";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import Footer from "../components/Footer";
import { useSession, getSession, signIn } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  const [session, loading] = useSession();

  //useEffect, check si ya une session NON outdated en LS
  // si oui on log dessus
  // si non on l'efface

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
