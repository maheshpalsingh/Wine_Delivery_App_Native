import React, {createRef, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Input,
  Text,
  Image,
  Button,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import axios from 'axios';
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';
// Platform.OS === 'android'
//   ? 'http://103.238.108.223:3001'
//   : 'http://127.0.0.1:3000';

import Colors from '../assets/theme/Colors';

import {useNavigation} from '@react-navigation/native';
import {LOGIN} from '../constants/routeName';
import {HomeStackScreen} from '../navigations/HomeNavigator';
const Signup = () => {
  const {navigate} = useNavigation();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();
  const cnoInputRef = createRef();

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName) {
      alert('Please fill Name');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userAge) {
      alert('Please fill Age');
      return;
    }
    if (!userContact) {
      alert('Please fill Age');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    //Show Loader
    setLoading(true);
    var dataToSend = {
      name: userName,
      email: userEmail,
      age: userAge,
      password: userPassword,
      contactno: userContact,
    };
    console.log(dataToSend);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios
      .post(`${url}/users/register`, dataToSend, config)
      .then(() => console.log('Registration Successfull'))
      .then(() => {
        navigate(LOGIN);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  return (
    <View style={styles.screen}>
      <Image
        style={styles.logo}
        source={require('../assets/my-app/download.jpg')}
      />
      <View>
        {/* <Text style={styles.title}>Welcome to Wine Delivery App</Text>
        <Text style={styles.subtitle}>Create a free Account🎁</Text> */}
        <ScrollView>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserName => setUserName(UserName)}
                underlineColorAndroid="#f000"
                placeholder="Enter Name"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                onSubmitEditing={() =>
                  emailInputRef.current && emailInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                underlineColorAndroid="#f000"
                placeholder="Enter Email"
                placeholderTextColor="#8b9cb5"
                keyboardType="email-address"
                ref={emailInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                underlineColorAndroid="#f000"
                placeholder="Enter Password"
                placeholderTextColor="#8b9cb5"
                ref={passwordInputRef}
                returnKeyType="next"
                secureTextEntry={true}
                onSubmitEditing={() =>
                  ageInputRef.current && ageInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserAge => setUserAge(UserAge)}
                underlineColorAndroid="#f000"
                placeholder="Enter Age"
                placeholderTextColor="#8b9cb5"
                keyboardType="numeric"
                ref={ageInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  cnoInputRef.current && cnoInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserContact => setUserContact(UserContact)}
                underlineColorAndroid="#f000"
                placeholder="Enter Contact No."
                placeholderTextColor="#8b9cb5"
                keyboardType="numeric"
                ref={cnoInputRef}
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.buttonview}>
              {errortext != '' ? (
                <Text style={styles.errorTextStyle}>{errortext}</Text>
              ) : null}
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitButton}>
                <Text style={styles.buttonTextStyle}>REGISTER</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
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
  buttonview: {
    paddingTop: 10,
    paddingLeft: 90,
    paddingRight: 50,
    tintColor: 'white',
    fontSize: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastSection: {
    flexDirection: 'row',
  },
  link: {
    paddingTop: 10,
    paddingLeft: 25,
    color: Colors.primary,
    fontSize: 18,
  },
  infoText: {
    paddingTop: 10,
    fontSize: 18,
  },
  inputStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'baseline',
    padding: 5,
  },
  buttonStyle: {
    fontSize: 22,
    backgroundColor: Colors.purple,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 40,

    borderRadius: 18,
  },
  buttonTextStyle: {
    justifyContent: 'center',
    color: 'white',
    fontSize: 18,
  },
});

export default Signup;
