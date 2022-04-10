import React from 'react';
import {View, StyleSheet, Button, TouchableOpacity, Text} from 'react-native';
import Colors from '../../assets/theme/Colors';
const Commanbutton = props => {
  return (
    <View style={styles.screen}>
      <TouchableOpacity
        style={{...styles.buttonView, ...props.style}}
        onPress={props.onPress}>
        <Text style={styles.text}>{props.title}</Text>
      </TouchableOpacity>
      {/* <Button
        style={styles.button}
        title={props.title}
        onPress={props.onPress}
        color={Colors.purple}
      /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,

    flex: 1,
    backgroundColor: Colors.purple,
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 22,
    borderRadius: 15,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});

export default Commanbutton;
