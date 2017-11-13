import React from 'react';
import {FlatList} from 'react-native';
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {Actions} from 'react-native-router-flux'
import {List, ListItem} from "react-native-elements";

const userQuery = gql`
  query($query: String!, $cursor: String) {
    search(query: $query, type: USER, first: 20, after: $cursor){
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
          }
        }
        cursor
      }
    }
  }
`;

//fullname:Branka, language:Javascript, location:Belgrade, followers:<10

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      next: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.search) {
      let usersArray = nextProps.data.search.edges;
      this.setState({next: usersArray[usersArray.length - 1].cursor});
    }
  }

  fetchUsers() {
    this.props.data.fetchMore({
      variables: {cursor: this.state.next},
      updateQuery: (previousResult, {fetchMoreResult}) => {
        return {search: {edges: [...previousResult.search.edges, ...fetchMoreResult.search.edges]}};
      },
    });
  }

  render() {
    const users = this.props.data.search ? this.props.data.search.edges : null;

    return (
      <List containerStyle={{marginTop: 0}}>
        {users &&
        <FlatList
          data={users}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => (
            <ListItem
              roundAvatar
              title={item.node.name}
              subtitle={item.node.location}
              avatar={{uri: item.node.avatarUrl}}
              onPress={() => Actions.user(item)}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={({distanceFromEnd}) => {
            this.fetchUsers()
          }}
        />
        }
      </List>
    );
  }
}

export default graphql(userQuery, {
  options(ownProps) {
    return {
      variables: {
        query: `language:${ownProps.language}`,
        cursor: null
      },
    };
  },
})(UserList);