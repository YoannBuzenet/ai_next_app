import AppWrapper from "../components/AppWrapper";
import "../styles/globals.css";
import { Provider } from "next-auth/client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
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
