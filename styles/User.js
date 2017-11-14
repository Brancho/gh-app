import {StyleSheet, Dimensions} from 'react-native';

let {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  top: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10
  },
  avatar: {
    width: width * .83,
    height: width * .83
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingTop: 10
  },
  bio: {
    fontStyle: 'italic',
    marginBottom: 10
  },
  contact: {
    marginTop: 10
  }
});

export default styles;