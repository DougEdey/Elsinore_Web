import React from "react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";

import CustomThemeProvider from "../components/CustomThemeProvider";
import { useApollo } from "../lib/apolloClient";

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <CustomThemeProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </CustomThemeProvider>
      </ApolloProvider>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
