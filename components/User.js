import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import {Card} from 'react-native-elements'

class User extends React.Component {
  render() {

    let {width} = Dimensions.get('window');
    const {name, bio, location, avatarUrl, company, email, websiteUrl} = this.props.node;

    return (
      <Card>
        <View style={{justifyContent: 'center'}}>
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10}}>
            <Image source={{uri: avatarUrl}} style={{width: width * .83, height: width * .83}} resizeMode="cover"/>
            <Text style={{fontSize: 25, fontWeight: 'bold', paddingBottom: 10, paddingTop: 10}}>{name}</Text>
          </View>
          <Text style={{fontStyle: 'italic', marginBottom: 10}}>{bio}</Text>
          <Text>Location: {location}</Text>
          <Text>Company: {company}</Text>
          <View style={{marginTop: 10}}>
            <Text>{email}</Text>
            <Text>{websiteUrl}</Text>
          </View>
        </View>
      </Card>
    );
  }
}

export default User