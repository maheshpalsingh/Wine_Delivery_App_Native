import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import Colors from '../assets/theme/Colors';
import {REGISTER, RESET_PASSWORD} from '../constants/routeName';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../store/actions/cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';

const Login = props => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');

  const dispatch = useDispatch();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    // if (valid === false) {
    //   alert('Worng Credentials');
    //   return;
    // }

    let dataToSend = {email: userEmail, password: userPassword};
    console.log(dataToSend);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .post(`${url}/users/login`, dataToSend, config)
      .then(response => {
        const {token} = response.data;
        //console.log(response.data);
        // Using Redux Store
        dispatch(setToken(token));
        //Using AsyncStorage
        // try {
        //   await AsyncStorage.setItem('token', token);
        // } catch (e) {
        //   console.log('Error while saving token in Async', e);
        // }
      })

      .then(() => {
        navigate('DrawerNavigationRoutes');
      })
      .catch(function (error) {
        alert('Invalid Credentials');
        // setvalid(false);
        // setvalid(true);
        console.log(error);
      });
  };
  const {navigate} = useNavigation();
  return (
    <View style={styles.screen}>
      <View style={{paddingBottom: 10}}>
        <Image
          style={styles.image}
          source={require('../assets/my-app/download.jpg')}
        />
      </View>

      <View
        style={{
          paddingBottom: 10,
          paddingTop: 10,
          justifyContent: 'center',
        }}>
        <TextInput
          style={styles.input}
          value={userEmail}
          onChangeText={UserEmail => setUserEmail(UserEmail)}
          placeholder="Enter Email"
        />
      </View>
      <View style={{paddingBottom: 10}}>
        <TextInput
          style={styles.input}
          value={userPassword}
          onChangeText={UserPassword => setUserPassword(UserPassword)}
          placeholder="Enter Password" //12345
          keyboardType="default"
          //secureTextEntry={true}
        />
      </View>
      {errortext != '' ? (
        <Text style={styles.errorTextStyle}>{errortext}</Text>
      ) : null}
      <View style={styles.buttonView}>
        <Button
          style={styles.button}
          title="Sign in"
          color={Colors.purple}
          onPress={
            handleSubmitPress
            // console.log(username);
          }
          // onPress={props.signIn}
        />
      </View>
      <View>
        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => {
              navigate(RESET_PASSWORD);
            }}>
            <Text
              style={{
                padding: 10,
                paddingLeft: 20,
                fontSize: 16,
              }}>
              Forget Password
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.info}>Dont't have an Account</Text>
        <TouchableOpacity
          onPress={() => {
            navigate(REGISTER);
          }}>
          <Text style={styles.link}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.thistle,
  },
  image: {
    marginTop: 30,
    marginLeft: 70,
    borderRadius: 25,
  },
  welcome: {
    padding: 10,
    marginLeft: 150,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    paddingBottom: 10,
  },
  input: {
    marginLeft: 30,
    marginRight: '20%',
    borderTopRightRadius: 12,
  },
  button: {
    borderRadius: 10,
  },
  buttonView: {
    paddingTop: 15,
    paddingLeft: 50,
    paddingRight: 80,
    fontSize: 22,
  },
  info: {
    fontSize: 18,
    padding: 15,
    flexDirection: 'row',
  },
  link: {
    paddingLeft: 25,
    color: Colors.primary,
    fontSize: 18,
  },
});

export default Login;
