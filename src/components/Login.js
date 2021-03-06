import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {
  View,
  Modal,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import Colors from '../assets/theme/Colors';
import {REGISTER, RESET_PASSWORD, URL} from '../constants/routeName';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setToken} from '../store/actions/cart';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Commanbutton from './shop/CommanButton';
const WIDTH = Dimensions.get('window').width;

const Login = props => {
  const {navigate} = useNavigation();
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
      Alert.alert('Warning', 'Please enter your Email', [{text: 'OK'}]);
      return;
    }
    if (!userPassword) {
      Alert.alert('Warning', 'Please enter your Password', [{text: 'OK'}]);
      return;
    }
    let dataToSend = {email: userEmail, password: userPassword};

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .post(`${URL}/users/login`, dataToSend, config)
      .then(async response => {
        const {token} = response.data;
        //console.log('while login..', token);
        dispatch(setToken(token));
        try {
          await AsyncStorage.setItem('token', JSON.stringify({token}));
        } catch (e) {
          console.log('Error while saving token in Async', e);
        }
      })
      .then(() => {
        changeModalVisible(true),
          setTimeout(() => {
            changeModalVisible(false);
          }, 3000);
      })
      .catch(function (error) {
        Alert.alert('Invalid Credentials', 'Wrong Username or Password', [
          {text: 'OK'},
        ]);
      });
  };

  return (
    <View style={styles.screen}>
      <ScrollView>
        <KeyboardAvoidingView enabled>
          <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
              setisModalVisible(!isModalVisible);
            }}>
            <TouchableOpacity disabled={true} style={styles.container}>
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

          <TextInput
            theme={{colors: {primary: 'purple'}}}
            style={styles.input}
            mode="flat"
            value={userEmail}
            onChangeText={UserEmail => setUserEmail(UserEmail)}
            label="Enter Email"
          />

          <TextInput
            mode="flat"
            theme={{colors: {primary: 'purple'}}}
            style={styles.input}
            value={userPassword}
            onChangeText={UserPassword => setUserPassword(UserPassword)}
            label="Enter Password" //12345
            keyboardType="default"
            secureTextEntry={true}
          />

          <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => {
                navigate(RESET_PASSWORD);
              }}>
              <Text
                style={{
                  paddingRight: 30,
                  fontSize: 15,
                  color: '#7F7D9C',
                }}>
                Forget Password
              </Text>
            </TouchableOpacity>
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
          <View style={styles.buttonView}>
            <Commanbutton title="SIGN IN" onPress={handleSubmitPress} />
          </View>

          <View style={styles.info}>
            <Text style={styles.text1}>Dont't have an Account ?</Text>
            <TouchableOpacity
              onPress={() => {
                navigate(REGISTER);
              }}>
              <Text style={styles.link}>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
    marginLeft: 30,
    marginBottom: 5,
    width: '85%',
    borderRadius: 20,
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
    marginHorizontal: 30,
    marginTop: 15,
    marginBottom: 5,
    // borderRadius: 10,
  },

  info: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    fontSize: 18,
    color: '#7F7F9C',
  },
  link: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    color: Colors.purple,
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
