import React from "react";
import { gql } from "@apollo/client";

import App from "../components/App";
import Header from "../components/Header";
import DeviceList from "../components/DeviceList";
// import { DeviceListQuery } from "./components/graphql/DeviceList";
import { initializeApollo, addApolloState } from "../lib/apolloClient";

const IndexPage = () => (
  <App>
    <Header />
    <DeviceList />
  </App>
);

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: gql`
      query {
        temperatureControllers {
          id
        }
      }
    `,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}

export default IndexPage;
