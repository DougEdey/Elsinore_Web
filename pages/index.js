import App from '../components/App'
import Header from '../components/Header'
import DeviceList from '../components/DeviceList'

import { initializeApollo, addApolloState } from '../lib/apolloClient'

const IndexPage = () => (
  <App>
    <Header />
    <DeviceList />
  </App>
)

export async function getStaticProps () {
  const apolloClient = initializeApollo()

  // await apolloClient.query({
  //   query: deviceList,
  // })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default IndexPage
