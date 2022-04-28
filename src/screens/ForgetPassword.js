import React, {createRef, useState} from 'react';
import {Text, TextInput} from 'react-native-paper';
import {
  View,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {LOGIN, URL} from '../constants/routeName';
import Colors from '../assets/theme/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Commanbutton from '../components/shop/CommanButton';
const WIDTH = Dimensions.get('window').width;
import LottieView from 'lottie-react-native';

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
      Alert.alert('Warning', 'Password and Confirm Password should same', [
        {text: 'OK'},
      ]);
      return;
    }
    if (!userEmail) {
      Alert.alert('Warning', 'Please enter Email', [{text: 'OK'}]);
      return;
    }
    if (!userPassword) {
      Alert.alert('Warning', 'Please enter Password', [{text: 'OK'}]);
      return;
    }
    if (!userconfirmPassword) {
      Alert.alert('Warning', 'Please enter Confirm Password', [{text: 'OK'}]);
      return;
    }

    var dataToSend = {
      email: userEmail,
      password: userPassword,
      confirmpassword: userconfirmPassword,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .post(`${URL}/users/reset/password`, dataToSend, config)
      .then(
        changeModalVisible(true),
        setTimeout(() => {
          changeModalVisible(false);
          navigate(LOGIN);
        }, 2000),
      )
      .catch(error => {
        Alert.alert('Warning', 'Invalid Credentials', [{text: 'OK'}]);
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
      <ScrollView>
        <KeyboardAvoidingView enabled="true">
          <View style={styles.form}>
            {/* <Image
              style={styles.image}
              source={require('../assets/my-app/download.jpg')}
            /> */}
            <LottieView
              style={styles.image}
              source={require('./../assets/loader/97494-cheers-wine.json')}
              autoPlay
              loop
            />
            <TextInput
              theme={{colors: {primary: 'purple'}}}
              label="Enter email"
              mode="flat"
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
              theme={{colors: {primary: 'purple'}}}
              label="New Password"
              mode="flat"
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
              theme={{colors: {primary: 'purple'}}}
              label="Confirm New Password"
              mode="flat"
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
        </KeyboardAvoidingView>

        <Commanbutton
          title="UPDATE PASSWORD"
          style={styles.cb}
          onPress={handleSubmitButton}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cb: {
    flex: 1,
    height: 48,
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.thistle,
  },
  form: {
    //margin: 21,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    marginHorizontal: 10,
    marginTop: 15,
    padding: 10,
    width: 350,
    height: 45,
  },
  heading: {
    fontSize: 20,
    color: '#7F7D9C',
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
  image: {
    width: 200,
  },
});

export default Forgetpassword;
