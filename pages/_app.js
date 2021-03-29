import { useContext } from "react";
import AppWrapper from "../components/AppWrapper";
import "../styles/globals.css";
import { Provider } from "next-auth/client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TransparentDivContext from "../contexts/transparentDiv";
import TransparentDiv from "../components/TransparentDiv";

function MyApp({ Component, pageProps }) {
  const { isTransparentDivDisplayed } = useContext(TransparentDivContext);

  return (
    <AppWrapper>
      <Provider session={pageProps.session}>
        {isTransparentDivDisplayed && <TransparentDiv />}
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </AppWrapper>
  );
}

export default MyApp;
