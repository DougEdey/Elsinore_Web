import React from "react";
import { ApolloProvider } from "@apollo/client";
import PropTypes from "prop-types";

import { useApollo } from "../lib/apolloClient";

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};
