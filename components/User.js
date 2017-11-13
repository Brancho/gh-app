import React from 'react';
import { View, Text, Image } from 'react-native';


class User extends React.Component {
  render(){
    console.log(this.props.node);
    const { name, bio, location, avatarUrl, company, isHireable, email, websiteUrl } = this.props.node;

    return(
      <View>
        <Image source={{uri: avatarUrl}} style={{width: 200, height: 200}}/>
        <Text>{name}</Text>
        <Text>{bio}</Text>
        <Text>{location}</Text>
        <Text>{company}</Text>
        <Text>{email}</Text>
        <Text>{websiteUrl}</Text>
        <Text>{isHireable ? "Available for new opportunities." : "Not available for hiring."}</Text>
      </View>
    );
  }
}

export default User