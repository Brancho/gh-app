import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  top: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'white'
  },
  searchInput: {
    height: 50,
    margin: 0,
    paddingLeft: 10,
    flex: 1
  },
  searchButton: {
    flex: 0.2
  },
  divider: {
    backgroundColor: 'gray'
  },
  filter: {
    flex: 1,
    height: 45
  },
  filterTitle: {
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 15
  },
  listBg: {
    flex: 1,
    backgroundColor: '#E7F6FE'
  }
});

export default styles;