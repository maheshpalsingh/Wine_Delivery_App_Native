import React, {createRef, useState} from 'react';
import {Text, TextInput} from 'react-native-paper';
import {
  View,
  StyleSheet,
  Button,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {LOGIN} from '../constants/routeName';
import Colors from '../assets/theme/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = 150;
const Forgetpassword = ({navigation}) => {
  const {navigate} = useNavigation();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [userconfirmPassword, setconfirmPassword] = useState('');
  const [errortext, setErrortext] = useState('');
  const [isModalVisible, setisModalVisible] = useState(false);
  const passwordInputRef = createRef();
  const confirmpasswordInputRef = createRef();
  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };
  const handleSubmitButton = () => {
    setErrortext('');
    if (userPassword !== userconfirmPassword) {
      alert('Password and Confirm Password should same');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }

    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    if (!userconfirmPassword) {
      alert('Please fill Password');
      return;
    }
    //Show Loader

    var dataToSend = {
      email: userEmail,
      password: userPassword,
      confirmpassword: userconfirmPassword,
    };

    console.log(dataToSend);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .post(`${url}/users/reset/password`, dataToSend, config)
      .then(
        changeModalVisible(true),
        setTimeout(() => {
          changeModalVisible(false);
        }, 2000),
      )
      .then(() => {
        navigation.navigate.goBack();
      })
      .catch(error => {
        //Hide Loader
        console.error(error);
      });
  };
  return (
    <View style={styles.screen}>
      <Modal
        animationType="slide"
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
              <Text style={{fontSize: 26}}>Password Updated Successfully</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <View style={styles.form}>
        <Text style={styles.heading}>Setup New Password</Text>
        <TextInput
          placeholder="Enter email"
          style={styles.input}
          onChangeText={UserName => setUserEmail(UserName)}
          underlineColorAndroid="#f000"
          placeholderTextColor="#8b9cb5"
          autoCapitalize="sentences"
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordInputRef.current && passwordInputRef.current.focus()
          }
          blurOnSubmit={false}
        />

        <TextInput
          placeholder="New Password"
          style={styles.input}
          onChangeText={UserPassword => setPassword(UserPassword)}
          underlineColorAndroid="#f000"
          placeholderTextColor="#8b9cb5"
          ref={passwordInputRef}
          returnKeyType="next"
          secureTextEntry={true}
          onSubmitEditing={() =>
            confirmpasswordInputRef.current &&
            confirmpasswordInputRef.current.focus()
          }
          blurOnSubmit={false}
        />

        <TextInput
          placeholder="Confirm New Password"
          style={styles.input}
          onChangeText={UserPassword => setconfirmPassword(UserPassword)}
          underlineColorAndroid="#f000"
          placeholderTextColor="#8b9cb5"
          ref={confirmpasswordInputRef}
          returnKeyType="next"
          secureTextEntry={true}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.button}>
        <Button
          title={'Update Password'}
          color={Colors.primary}
          onPress={handleSubmitButton}
        />
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

export default Forgetpassword;
