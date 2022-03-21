import React from 'react';
import {
  View,
  StyleSheet,
  Input,
  Text,
  TextInput,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../assets/theme/Colors';

import {useNavigation} from '@react-navigation/native';
import {LOGIN} from '../constants/routeName';
const Signup = () => {
  const {navigate} = useNavigation();
  return (
    <View style={styles.screen}>
      <Image
        style={styles.logo}
        source={require('../assets/my-app/download.jpg')}
      />
      <View>
        <Text style={styles.title}>Welcome to Wine Delivery App</Text>
        <Text style={styles.subtitle}>Create a free Account🎁</Text>
        <View style={styles.form}>
          <TextInput label="UserName:" placeholder="Enter Username" />

          <TextInput label="Email:" placeholder="Enter Email" />
          <TextInput
            label="Password:"
            placeholder="Enter Password"
            secureTextEntry={true}
          />
          <TextInput
            label="Age:"
            placeholder="Enter Age"
            keyboardType="number-pad"
          />

          <View style={styles.buttonView}>
            <Button
              style={styles.button}
              title="REGISTER"
              color={Colors.purple}
            />
          </View>

          <View style={styles.lastSection}>
            <Text style={styles.infoText}>Already have a account</Text>
            <TouchableOpacity
              onPress={() => {
                navigate(LOGIN);
              }}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.thistle,
  },
  logo: {
    width: 170,
    height: 100,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    paddingTop: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    paddingVertical: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  form: {
    paddingTop: 20,
    // fontSize: 20,
  },
  button: {
    borderRadius: 10,
  },
  buttonView: {
    paddingTop: 15,
    paddingLeft: 50,
    paddingRight: 50,
    fontSize: 22,
  },
  lastSection: {
    flexDirection: 'row',
  },
  link: {
    paddingTop: 20,
    paddingLeft: 25,
    color: Colors.primary,
    fontSize: 18,
  },
  infoText: {
    paddingTop: 20,
    fontSize: 18,
  },
});

export default Signup;
