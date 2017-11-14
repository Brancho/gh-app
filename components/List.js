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
      this.setState({next: usersArray[usersArray.length - 1] ? usersArray[usersArray.length - 1].cursor : null});
    }
  }

  fetchUsers() {
    this.props.data.fetchMore({
      variables: {
        cursor: this.state.next
      },
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

    let {fullname, location, followers, language} = ownProps;
    let query = `language:${language}${fullname ? `, fullname:${fullname}` : ''}${location ? `, location:${location}` : ''}${followers ? `, followers:${followers}` : ''}`;

    return {
      variables: {
        query,
        cursor: null
      },
    };
  },
})(UserList);