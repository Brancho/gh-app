import React from 'react';
import { View } from 'react-native';
import UserList from './List';
import { SearchBar, Button } from 'react-native-elements'


class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      language: 'Javascript'
    };
  }

  render(){
    return(
      <View style={{ flex: 1 }}>
        <SearchBar
          ref={search => this.search = search}
          placeholder="Search users by language"
        />
        <Button
          onPress={() => this.search.input._lastNativeText ? this.setState({ language: this.search.input._lastNativeText}) : null}
          title='SEARCH' />
        <UserList language={this.state.language}/>
      </View>
    );
  }
}

export default Main