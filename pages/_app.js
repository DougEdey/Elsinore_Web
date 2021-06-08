import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import PropTypes from 'prop-types'

export default function App ({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
}
