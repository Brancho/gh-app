import React from 'react';
import {ApolloProvider} from 'react-apollo'
import { Router, Scene, Stack } from 'react-native-router-flux'
import client from './client'
import Main from './components/Main'
import User from './components/User'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Stack key="root">
          <Scene key="home" component={Main} title="Search"/>
          <Scene key="user" component={User}/>
        </Stack>
      </Router>
    </ApolloProvider>
  );
};


export default App


