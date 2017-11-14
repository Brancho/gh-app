import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {Card} from 'react-native-elements'
import styles from '../styles/User'

class User extends React.Component {
  render() {
    const {name, bio, location, avatarUrl, company, email, websiteUrl} = this.props.node;
    return (
      <ScrollView>
      <Card>
        <View>
          <View style={styles.top}>
            <Image source={{uri: avatarUrl}} style={styles.avatar} resizeMode="cover"/>
            <Text style={styles.name}>{name}</Text>
          </View>
          <Text style={styles.bio}>{bio}</Text>
          <Text>Location: {location}</Text>
          <Text>Company: {company}</Text>
          <View style={styles.contact}>
            <Text>{email}</Text>
            <Text>{websiteUrl}</Text>
          </View>
        </View>
      </Card>
      </ScrollView>
    );
  }
}

export default User