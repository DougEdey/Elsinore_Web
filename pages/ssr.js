import React from "react";

import MainLayout from "../components/MainLayout";

const SSRPage = () => <MainLayout />;

// export async function getServerSideProps() {
//   const apolloClient = initializeApollo()

//   await apolloClient.query({
//     query: deviceList,
//   })

//   return addApolloState(apolloClient, {
//     props: {},
//   })
// }

export default SSRPage;
