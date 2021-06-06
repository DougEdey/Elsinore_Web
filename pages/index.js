import App from '../components/App'
import Header from '../components/Header'
import DeviceList, {
  ALL_DEVICES_QUERY,
} from '../components/DeviceList'
import { initializeApollo, addApolloState } from '../lib/apolloClient'

const IndexPage = () => (
  <App>
    <Header />
    <DeviceList />
  </App>
)

export async function getStaticProps () {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_DEVICES_QUERY,
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default IndexPage
