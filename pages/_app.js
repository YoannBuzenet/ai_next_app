import AppWrapper from "../components/AppWrapper";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSession, Provider } from "next-auth/client";

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
