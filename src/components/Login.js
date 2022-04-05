import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import Colors from '../assets/theme/Colors';
import {REGISTER} from '../constants/routeName';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../store/actions/cart';
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';

const Login = props => {
  // let logintoken = useSelector(state => state.cart.token);
  //let carttoken = useSelector(state => state.cart.token);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');
  const [valid, setvalid] = useState(true);
  const dispatch = useDispatch();

  const handleSubmitPress = navigation => {
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
        console.log(response.data);
        // logintoken = token;
        dispatch(setToken(token));
        //mam this is not working...without dispatch login is correctly
        //refresh
        //where is this api callnng ?his mean 401 error one api
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
      <View>
        <Image
          style={styles.image}
          source={require('../assets/my-app/download.jpg')}
        />
      </View>
      <View>
        <Text style={styles.welcome}>{props.title}</Text>
      </View>
      <View style={{paddingBottom: 10}}>
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
    marginTop: 50,
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
    borderBottomColor: Colors.purple,
    borderWidth: 1,
    marginLeft: '10%',
    marginRight: '20%',
    borderRadius: 12,
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
  info: {
    fontSize: 18,
    padding: 25,
    flexDirection: 'row',
  },
  link: {
    paddingLeft: 25,
    color: Colors.primary,
    fontSize: 18,
  },
});

export default Login;
