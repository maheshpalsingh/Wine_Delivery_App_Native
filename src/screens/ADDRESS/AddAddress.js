import React, {createRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Colors from '../../assets/theme/Colors';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = 150;
import axios from 'axios';
import {useSelector} from 'react-redux';
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';
import Icon from 'react-native-vector-icons/Ionicons';
const Addaddress = ({navigation}) => {
  const [fullname, setfullname] = useState('');
  const [userphoneno, setUserphoneno] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userState, setUserState] = useState('');
  const [pincode, setPincode] = useState('');
  const [userAddress, setUserAddress] = useState('');

  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const fullnameInputRef = createRef();
  const phoneInputRef = createRef();
  const addressInputRef = createRef();
  const cityInputRef = createRef();
  const stateInputRef = createRef();
  const pincodeInputRef = createRef();
  let token = useSelector(state => state.cart.token);
  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };

  const handleSubmitButton = () => {
    setErrortext('');
    if (!fullname) {
      alert('Please fill Name');
      return;
    }
    if (!userphoneno) {
      alert('Please fill Contactno');
      return;
    }
    if (!userCity) {
      alert('Please fill City');
      return;
    }
    if (!userState) {
      alert('Please fill State');
      return;
    }
    if (!pincode) {
      alert('Please fill Pincode');
      return;
    }

    //Show Loader
    setLoading(true);
    var dataToSend = {
      fullname: fullname,
      address: userAddress,
      city: userCity,
      state: userState,
      pincode: pincode,
      phoneno: userphoneno,
    };
    console.log(dataToSend);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${url}/user/add/address`, dataToSend, config)
      .then(
        changeModalVisible(true),
        setTimeout(() => {
          changeModalVisible(false);
        }, 2000),
      )
      .then(() => {
        navigation.goBack();
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  return (
    <View>
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
              <Text style={{fontSize: 26}}>Address Added Success</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <View>
        {/* <Text style={styles.title}>Welcome to Wine Delivery App</Text>
        <Text style={styles.subtitle}>Create a free Account🎁</Text> */}
        <ScrollView>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserName => setfullname(UserName)}
                underlineColorAndroid="#f000"
                placeholder="Enter FullName"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                onSubmitEditing={() =>
                  phoneInputRef.current && phoneInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserphoneno(UserEmail)}
                underlineColorAndroid="#f000"
                placeholder="Enter Contactno"
                placeholderTextColor="#8b9cb5"
                keyboardType="number-pad"
                ref={phoneInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  addressInputRef.current && addressInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserAddress(UserPassword)}
                underlineColorAndroid="#f000"
                placeholder="Enter Address"
                placeholderTextColor="#8b9cb5"
                ref={addressInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  cityInputRef.current && cityInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserCity(UserPassword)}
                underlineColorAndroid="#f000"
                placeholder="Enter City Name"
                placeholderTextColor="#8b9cb5"
                ref={cityInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  stateInputRef.current && stateInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserAge => setUserState(UserAge)}
                underlineColorAndroid="#f000"
                placeholder="Enter State"
                placeholderTextColor="#8b9cb5"
                ref={stateInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  pincodeInputRef.current && pincodeInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserContact => setPincode(UserContact)}
                underlineColorAndroid="#f000"
                placeholder="Enter Pincode."
                placeholderTextColor="#8b9cb5"
                keyboardType="numeric"
                ref={pincodeInputRef}
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
                <Text style={styles.buttonTextStyle}>ADD</Text>
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
export default Addaddress;
