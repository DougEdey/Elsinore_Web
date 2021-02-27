import './App.css';

import { ApolloProvider, useQuery, gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://raspberrypi.local:8080/graphql',
  cache: new InMemoryCache()
})

const PROBE_LIST = gql`
  query {
    probeList
  }
`;

function UpdateProbeList() {
  const { loading, error, data } = useQuery(PROBE_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p> Error :(</p>;

  return data.probeList.map(address => {
    return <div key={address}>
      <p>
        {address}: AVAILABLE
      </p>
    </div>
  });
}


function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">
        <UpdateProbeList />
      </header>
    </div>
    </ApolloProvider>
  );
}

export default App;
