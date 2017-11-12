import {ApolloClient} from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';

const TOKEN = 'Bearer 09f004534619b2de40218da40160b6de8dbf8dbc';
const httpLink = createHttpLink({ uri: 'https://api.github.com/graphql' });
const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: TOKEN || null
    }
  });
  return forward(operation)
});

const link = middlewareLink.concat(httpLink);
export default client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});