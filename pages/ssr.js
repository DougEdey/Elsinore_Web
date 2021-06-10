import React from "react";

import App from "../components/App";
import Header from "../components/Header";
import DeviceList from "../components/DeviceList";

const SSRPage = () => (
  <App>
    <Header />
    <DeviceList />
  </App>
);

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
