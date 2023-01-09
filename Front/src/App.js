import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { graphql } from 'graphql';
import GetBooks from './components/GetBooks';
import Form from './components/Form';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`graphql error ${message}`)
    })
  }
})
const link = from([
  errorLink,
  new HttpLink({
    uri: "http://localhost:4000"
  })
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Form />
      <GetBooks />
    </ApolloProvider>
  );
}

export default App;
