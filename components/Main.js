import React from 'react';
import {View, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Text, TextInput} from 'react-native';
import UserList from './List';
import {Icon, Divider, FormLabel, FormInput} from 'react-native-elements'
import styles from '../styles/Main'


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'Javascript',
      location: null,
      name: null,
      followers: null,
      filter: false
    };
  }

  filterContainer() {
    return {
      width: Dimensions.get('window').width,
      height: this.state.filter ? 300 : 45,
      padding: 10,
      backgroundColor: '#E7F6FE'
    }
  }

  submitSearch() {
    let language = this.search._lastNativeText;
    let location = this.locationF._lastNativeText;
    let name = this.nameF._lastNativeText;
    let followers = this.followersF._lastNativeText;
    if (language) {
      this.setState({language, location, name, followers, filter: false})
    }
  }

  render() {
    let {name, language, location, followers} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <TextInput
            ref={search => this.search = search}
            style={styles.searchInput}
            placeholder="Search users by language"
            placeholderTextColor="black"
          />
          <TouchableOpacity style={styles.searchButton}>
            <Icon
              name='search'
              type='font-awesome'
              color='black'
              containerStyle={{height: '100%'}}
              onPress={this.submitSearch.bind(this)}
            />
          </TouchableOpacity>
        </View>
        <Divider style={styles.divider}/>
        <TouchableWithoutFeedback style={styles.filter}
                                  onPress={() => this.state.filter ? this.setState({filter: false}) : this.setState({filter: true})}>
          <View style={this.filterContainer()}>
            <Text style={styles.filterTitle}>Filter</Text>
              <FormLabel>Filter by name</FormLabel>
              <FormInput placeholder="Type users name" textInputRef={search => this.nameF = search}/>
              <FormLabel>Filter by location</FormLabel>
              <FormInput placeholder="e.g. San Francisco" textInputRef={search => this.locationF = search}/>
              <FormLabel>Filter by number of followers</FormLabel>
              <FormInput placeholder="e.g. >20, <10" textInputRef={search => this.followersF = search}/>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.listBg}>
          <UserList language={language} fullname={name} location={location} followers={followers}/>
        </View>
      </View>
    );
  }
}

export default Main



