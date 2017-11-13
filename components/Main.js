import React from 'react';
import { View, TextInput, Button } from 'react-native';
import List from './List';


class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      language: 'Javascript'
    };
  }
  render(){
    return(
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(language) => this.setState({language})}
          value={this.state.language}
        />
        <List language={this.state.language}/>
      </View>
    );
  }
}

export default Main