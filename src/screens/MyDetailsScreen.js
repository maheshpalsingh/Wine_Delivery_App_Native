import axios from 'axios';
// import React from 'react';
// import {View, Text, StyleSheet, SafeAreaView, TextInput} from 'react-native';
import {useSelector} from 'react-redux';

const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';
// //const token =
// //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ5MzIyMGUwM2UyZDcyNjY5OGIzM2IiLCJpYXQiOjE2NDg5NjQzOTR9.FKplrSHkuV_6AWSoTM3vvtizgsffcdK1ylBQe0aPkbY';

// const MyDetailsScreen = async () => {
//   // const config = {
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //     Authorization: `Bearer ${token}`,
//   //   },
//   // };
//   // await axios
//   //   .get(`${url}/orders/my`, config)
//   //   .then(response => {
//   //     console.log(response.data);
//   //   })
//   //   .catch(function (error) {
//   //     alert(error);
//   //   });
//   return (
//     <SafeAreaView>
//       <Text style={{fontSize: 20}}>My Details...</Text>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({});

// export default MyDetailsScreen;

import React, {createRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import Colors from '../assets/theme/Colors';
import {SimpleModal} from '../components/simpleModal';
import Icon from 'react-native-vector-icons/Ionicons';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = 150;
const MyDetailsScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isModalVisible, setisModalVisible] = useState(false);
  const [data, setdata] = useState('');

  let token = useSelector(state => state.cart.token);
  //let token =
  //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjRhZDYxMzliNTJjN2I1ODFhMTAwZTYiLCJpYXQiOjE2NDkwNzMyMDl9.XQm8m53DrJ5v6S8EBlGLhJTEvq94Eo63f1FGyIA2U7k';

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    fetchMyProfile();

    return () => {};
  }, []);
  const fetchMyProfile = () => {
    axios
      .get(`${url}/users/get/me`, config)
      .then(response => {
        setdata(response.data);
      })
      .catch(function (error) {
        alert(error);
      });
  };
  const handleSubmitButton = () => {
    setLoading(true);
    var dataToSend = {
      name: userName,
      email: userEmail,
      age: userAge,
      password: userPassword,
      contactno: userContact,
    };
    console.log(dataToSend);

    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    // };

    axios
      .patch(`${url}/users/update/me`, dataToSend, config)
      .then(() => console.log('Successfully Updates'))
      .then(() => {
        navigation.goBack();
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.heading}>Update Details</Text>

      <View style={styles.text1}>
        <Text style={styles.heading}>Name</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.data}>
            <Text style={styles.text2}>{data.name}</Text>
          </View>
          {/* 
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => {
              changeModalVisible(true);
            }}>
            <Text style={styles.text}> EDit</Text>
          </TouchableOpacity> */}
          <View style={{width: 80, alignSelf: 'flex-end', padding: 10}}>
            <Button
              onPress={() => {
                changeModalVisible(true);
              }}
              title="Edit"
              color={Colors.purple}
            />
          </View>
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
                  name="close"
                  onPress={() => {
                    changeModalVisible(false);
                  }}
                  size={15}
                  style={{alignSelf: 'flex-end'}}
                />
                <Text style={styles.updatetext}>Update</Text>
                <TextInput
                  defaultValue={data.name}
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    marginTop: 20,
                  }}
                />
                <View
                  style={{
                    width: WIDTH / 3,
                    padding: 15,

                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Button title="Update" />
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>

        <Text style={styles.heading}>Email</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.data}>
            <Text style={styles.text2}>{data.email}</Text>
          </View>

          <View style={{width: 80, alignSelf: 'flex-end', padding: 10}}>
            <Button
              onPress={() => {
                changeModalVisible(true);
              }}
              title="Edit"
              color={Colors.purple}
            />
          </View>
        </View>

        <Text style={styles.heading}>Age</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.data}>
            <Text style={styles.text2}>{data.age}</Text>
          </View>

          <View style={{width: 80, alignSelf: 'flex-end', padding: 10}}>
            <Button
              onPress={() => {
                changeModalVisible(true);
              }}
              title="Edit"
              color={Colors.purple}
            />
          </View>
        </View>
        <Text style={styles.heading}>Contactno</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.data}>
            <Text style={styles.text2}>{data.contactno}</Text>
          </View>

          <View style={{width: 80, alignSelf: 'flex-end', padding: 10}}>
            <Button
              onPress={() => {
                changeModalVisible(true);
              }}
              title="Edit"
              color={Colors.purple}
            />
          </View>
        </View>
        {/* {errortext != '' ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null} */}
        {/* <View style={styles.save}>
          <Button
            title="Save"
            onPress={() => {
              handleSubmitButton();
            }}
          />
        </View> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    padding: 20,
    height: 200,
    width: WIDTH - 60,
    paddingTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  screen: {
    padding: 10,
    backgroundColor: Colors.thistle,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-start',
    margingBottom: 10,
  },
  heading: {
    padding: 10,
    fontSize: 18,
  },
  text1: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  text2: {
    marginLeft: 10,
    marginTop: 14,
    flex: 1,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  data: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    // alignSelf: 'center',
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 10,
  },
  save: {
    left: 15,
    margin: 10,
    width: 70,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  touchableOpacity: {
    backgroundColor: 'orange',
    paddingHorizontal: 50,
  },
  text: {
    fontSize: 16,
    marginVertical: 15,
  },
  updatetext: {
    fontStyle: 'normal',
    fontSize: 20,
    alignItems: 'center',
    paddingLeft: 10,
  },
});

export default MyDetailsScreen;

{
  /* <KeyboardAvoidingView enabled>
        <View style={styles.text1}>
          <Text style={styles.heading}>Name</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <TextInput
                value={data.name}
                placeholder={data.name}
                style={styles.input}
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

            <View style={{width: 80, alignSelf: 'flex-end', padding: 10}}>
              <Button title="Edit" color={Colors.purple} />
            </View>
          </View>

          <Text style={styles.heading}>Email</Text>
          <TextInput
            value={data.email}
            style={styles.input}
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
          <Text style={styles.heading}>Password</Text>
          <TextInput
            //value={data.password}
            style={styles.input}
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
          <Text style={styles.heading}>Age</Text>
          <TextInput
            value={data.age}
            style={styles.input}
            onChangeText={UserAge => setUserAge(UserAge)}
            underlineColorAndroid="#f000"
            placeholder="Enter Age"
            placeholderTextColor="#8b9cb5"
            keyboardType="numeric"
            ref={ageInputRef}
            returnKeyType="next"
            onSubmitEditing={() =>
              contactInputRef.current && contactInputRef.current.focus()
            }
            blurOnSubmit={false}
          />
          <Text style={styles.heading}>Contactno</Text>
          <TextInput
            value={data.contactno}
            style={styles.input}
            onChangeText={UserAge => setUserContact(UserAge)}
            underlineColorAndroid="#f000"
            placeholder="Enter Contact Number"
            placeholderTextColor="#8b9cb5"
            keyboardType="numeric"
            ref={contactInputRef}
            returnKeyType="next"
            blurOnSubmit={false}
          />
          {/* {errortext != '' ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null} */
}

{
  /* <View style={styles.save}>
        <Button
          title="Save"
          onPress={() => {
            handleSubmitButton();
          }}
        />
      </View> */
}
