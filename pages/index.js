import React from "react";
import { gql } from "@apollo/client";

import { initializeApollo, addApolloState } from "../lib/apolloClient";
import MainLayout from "../components/MainLayout";

const IndexPage = () => <MainLayout />;

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
