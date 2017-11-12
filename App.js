import React from 'react';
import {ApolloProvider} from 'react-apollo'
import client from './client'
import Main from './components/Main'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
};


export default App