import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {
  View,
  Modal,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Colors from '../assets/theme/Colors';
import {REGISTER, RESET_PASSWORD} from '../constants/routeName';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../store/actions/cart';

import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = 150;
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';

const Login = props => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');
  const [isModalVisible, setisModalVisible] = useState(false);
  const dispatch = useDispatch();

  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };

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
      .then(async response => {
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
      .then(
        changeModalVisible(true),
        setTimeout(() => {
          changeModalVisible(false);
        }, 3000),
      )
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setisModalVisible(!isModalVisible);
        }}>
        <TouchableOpacity disabled={true} style={styles.container}>
          {/* <Icon
            name="close"
            onPress={() => {
              changeModalVisible(false);
            }}
            size={15}
            style={{
              alignSelf: 'flex-end',
              marginRight: 30,
              marginBottom: 10,
              backgroundColor: 'white',
            }}
          /> */}
          <View style={styles.modal}>
            <Icon
              name="checkmark-circle-outline"
              size={90}
              color={Colors.white}
            />

            <View style={styles.modaltext}>
              <Text style={{fontSize: 26}}>Login Success</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
          secureTextEntry={true}
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
    marginRight: 30,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
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
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    height: 200,
    width: WIDTH - 60,
    paddingTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.thistle,
  },

  modaltext: {
    flex: 1,
    fontSize: '30',
  },
});

export default Login;
