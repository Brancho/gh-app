import React from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'



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
  constructor(props){
    super(props);
    this.state = {
      users: null
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.data.search){
      this.setState({users: nextProps.data.search.edges})
    }
  }

  render() {
    const { users } = this.state;
    return (
      <View>
        {users &&
        <FlatList
          data={users}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => (
            <View>
              <Image source={{uri: item.node.avatarUrl}} style={{width: 70, height: 70}}/>
              <Text>{item.node.name}</Text>
              <Text>{item.node.bio}</Text>
            </View>
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