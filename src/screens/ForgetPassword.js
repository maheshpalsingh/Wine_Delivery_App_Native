import React from 'react';
import {Text, TextInput} from 'react-native-paper';
import {View, StyleSheet, Button} from 'react-native';
import Colors from '../assets/theme/Colors';

const Forgetpassword = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.form}>
        <Text style={styles.heading}>Setup New Password</Text>
        <TextInput placeholder="Enter email" style={styles.input} />

        <TextInput placeholder="New Password" style={styles.input} />

        <TextInput placeholder="Confirm New Password" style={styles.input} />
      </View>
      <View style={styles.button}>
        <Button title={'Update Password'} color={Colors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.thistle,
  },
  form: {
    paddingTop: 40,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    borderTopRightRadius: 20,
    margin: 10,
    padding: 10,
    width: 300,
    height: 40,
  },
  heading: {
    fontSize: 25,
    paddingBottom: 10,
  },
  button: {
    borderRadius: 15,
    marginLeft: 50,
    fontSize: 30,
    flex: 1,
    width: 300,
    color: Colors.primary,
  },
});

export default Forgetpassword;
