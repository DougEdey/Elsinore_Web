import App from '../components/App'
import InfoBox from '../components/InfoBox'
import Header from '../components/Header'
import Submit from '../components/Submit'
import DeviceList, {
  ALL_DEVICES_QUERY,
} from '../components/DeviceList'
import { initializeApollo, addApolloState } from '../lib/apolloClient'

const SSRPage = () => (
  <App>
    <Header />
    <DeviceList />
  </App>
)

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_DEVICES_QUERY,
  })

  return addApolloState(apolloClient, {
    props: {},
  })
}

export default SSRPage
