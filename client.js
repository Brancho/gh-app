import {ApolloClient} from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';

// PLease supply your Github Token
// const TOKEN = 'Bearer <Your-GH-Token>';
const TOKEN = null;

if(!TOKEN){
  throw 'You must enter Github token. \n Example:\n Bearer <YOUR-GH-TOKEN>';
}

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