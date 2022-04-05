import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = 150;
const SimpleModal = () => {
  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={styles.modal}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    height: HEIGHT,
    width: WIDTH - 80,
    paddingTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default SimpleModal;
