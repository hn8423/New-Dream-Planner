import "../styles/globals.css";
import LayoutProvider from "providers/layoutProvider";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <LayoutProvider Component={Component}>
        <Component {...pageProps} />
      </LayoutProvider>
    </SessionProvider>
  );
}

export default MyApp;
