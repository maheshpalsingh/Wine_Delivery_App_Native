import React, {createRef, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import axios from 'axios';

import Colors from '../assets/theme/Colors';

import {useNavigation} from '@react-navigation/native';
import {LOGIN, URL} from '../constants/routeName';
import Icon from 'react-native-vector-icons/Ionicons';
import Commanbutton from './shop/CommanButton';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = 150;

const Signup = () => {
  const {navigate} = useNavigation();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isModalVisible, setisModalVisible] = useState(false);
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const passwordInputRef = createRef();
  const cnoInputRef = createRef();

  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName) {
      Alert.alert('Warning', 'Please enter Name', [{text: 'OK'}]);

      return;
    }
    if (!userEmail) {
      Alert.alert('Warning', 'Please enter Email', [{text: 'OK'}]);
      return;
    }
    if (!userAge) {
      Alert.alert('Warning', 'Please enter Age', [{text: 'OK'}]);
      return;
    }
    if (!userContact || userContact.length !== 10) {
      Alert.alert('Warning', 'Please enter Contact No.', [{text: 'OK'}]);
      return;
    }
    if (!userPassword) {
      Alert.alert('Warning', 'Please enter Password', [{text: 'OK'}]);
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
      .post(`${URL}/users/register`, dataToSend, config)
      .then(
        changeModalVisible(true),
        setTimeout(() => {
          changeModalVisible(false);
        }, 2000),
      )
      .then(() => {
        navigate(LOGIN);
      })
      .catch(error => {
        Alert.alert('Warning', 'Email Already Exists', [{text: 'OK'}]);
        setLoading(false);
        console.error(error);
      });
  };
  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Modal
          animationType="slide"
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
                <Text style={{fontSize: 26}}>Registration Success</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
        <Image
          style={styles.logo}
          source={require('../assets/my-app/download.jpg')}
        />
        <View>
          <Text style={styles.title}>Welcome to Wine Delivery App</Text>
          <Text style={styles.subtitle}>Create a free Account 🎁</Text>

          <KeyboardAvoidingView enabled="true">
            <View style={styles.SectionStyle}>
              <TextInput
                autoCapitalize={true}
                theme={{colors: {primary: 'purple'}}}
                style={styles.inputStyle}
                onChangeText={UserName => setUserName(UserName)}
                underlineColorAndroid="#f000"
                label="Enter Name"
                mode="flat"
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
                theme={{colors: {primary: 'purple'}}}
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                mode="flat"
                label="Enter Email"
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
                theme={{colors: {primary: 'purple'}}}
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                underlineColorAndroid="#f000"
                mode="flat"
                label="Enter Password"
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
                theme={{colors: {primary: 'purple'}}}
                style={styles.inputStyle}
                onChangeText={UserAge => setUserAge(UserAge)}
                underlineColorAndroid="#f000"
                mode="flat"
                label="Enter Age"
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
                theme={{colors: {primary: 'purple'}}}
                style={styles.inputStyle}
                onChangeText={UserContact => setUserContact(UserContact)}
                underlineColorAndroid="#f000"
                mode="flat"
                label="Enter Contact No."
                keyboardType="numeric"
                ref={cnoInputRef}
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            <View>
              {errortext != '' ? (
                <Text style={styles.errorTextStyle}>{errortext}</Text>
              ) : null}
              <Commanbutton
                title="REGISTER"
                style={styles.cb}
                onPress={handleSubmitButton}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cb: {
    height: 48,
    width: 350,
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 55,
    marginTop: 10,
    marginBottom: 10,
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.thistle,
  },
  logo: {
    width: 350,
    height: 150,
    alignSelf: 'center',
    marginTop: 28,
    marginBottom: 15,
    borderRadius: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    paddingVertical: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  form: {
    paddingTop: 20,
    // fontSize: 20,
  },

  inputStyle: {
    width: 350,
    height: 50,
  },
  buttonStyle: {
    fontSize: 22,
    backgroundColor: Colors.purple,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 40,
    borderRadius: 15,
  },
  buttonTextStyle: {
    justifyContent: 'center',
    color: 'white',
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

export default Signup;
