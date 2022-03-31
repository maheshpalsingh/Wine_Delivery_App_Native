import React, {createRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Input,
  Text,
  TextInput,
  Image,
  Button,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
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
  const [userAddress, setUserAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();

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
    };
    console.log(dataToSend);
    // var formBody = [];
    // for (var key in dataToSend) {
    //   var encodedKey = encodeURIComponent(key);
    //   var encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');
    const config = {
      headers: {
        //Header Defination
        //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Content-Type': 'application/json',
      },
    };

    axios
      .post(`${url}/users`, dataToSend, config)
      .then(() => console.log('Success'))
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
                  addressInputRef.current && addressInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>

            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitButton}>
              <Text style={styles.buttonTextStyle}>REGISTER</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
        {/* <View style={styles.form}>


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
        </View> */}
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
