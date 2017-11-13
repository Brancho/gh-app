import React from 'react';
import {Text, View, FlatList, Image, TouchableHighlight} from 'react-native';
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {Actions} from 'react-native-router-flux'


const userQuery = gql`
  query($query: String!) {
    search(query: $query, type: USER, first: 20){
      edges {
        node {
          ... on User {
            name
            bio
            location
            company
            email
            avatarUrl
            websiteUrl
            isHireable
          }
        }
      }
    }
  }
`;


class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.search) {
      this.setState({users: nextProps.data.search.edges})
    }
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  render() {
    const {users} = this.state;
    return (
      <View>
        {users &&
        <FlatList
          data={users}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({item}) => (
            <TouchableHighlight onPress={() => Actions.user(item)}>
              <View>
                <Image source={{uri: item.node.avatarUrl}} style={{width: 80, height: 80}}/>
                <Text>{item.node.name}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
        }
      </View>
    );
  }
}

export default graphql(userQuery, {
  options(ownProps) {
    return {
      variables: {
        query: `language:${ownProps.language}`,
      },
    };
  },
})(List);