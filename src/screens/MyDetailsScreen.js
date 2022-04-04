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
} from 'react-native';
import Colors from '../assets/theme/Colors';

const MyDetailsScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const emailInputRef = createRef();
  const contactInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();
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
    console.log('1111');
    // setErrortext('');
    // if (!userName) {
    //   alert('Please fill Name');
    //   return;
    // }
    // if (!userEmail) {
    //   alert('Please fill Email');
    //   return;
    // }
    // if (!userAge) {
    //   alert('Please fill Age');
    //   return;
    // }
    // if (!userPassword) {
    //   alert('Please fill Password');
    //   return;
    // }
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

    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    // };

    axios
      .patch(`${url}/users/update/me`, dataToSend, config)
      .then(() => console.log('Success'))
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
    <SafeAreaView style={styles.screen}>
      <Text style={styles.heading}>Update Details</Text>

      <KeyboardAvoidingView enabled>
        <View style={styles.text1}>
          <Text style={styles.heading}>Name</Text>
          <TextInput
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
          <Text style={styles.heading}>Email</Text>
          <TextInput
            // value={data.email}
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
          ) : null} */}
          <View style={styles.save}>
            <Button
              title="Save"
              onPress={() => {
                handleSubmitButton();
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: Colors.thistle,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 18,
  },
  text1: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
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
});

export default MyDetailsScreen;
