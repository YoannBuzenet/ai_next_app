import AppWrapper from "../components/AppWrapper";
import "../styles/globals.css";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </AppWrapper>
  );
}

export default MyApp;
