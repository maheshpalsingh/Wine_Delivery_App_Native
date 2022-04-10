import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
const axios = require('axios');
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {removeToken, setToken} from '../store/actions/cart';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../assets/theme/Colors';
import {LOGIN, MY_ADDRESS, MY_DETAILS, MY_ORDERS} from '../constants/routeName';
import * as userActions from '../store/actions/user';
import Icons from 'react-native-vector-icons/Ionicons';

const AccountsTab = ({navigation}) => {
  const dispatch = useDispatch();
  const [data, setdata] = useState('');
  const mydetails = useSelector(state => state.user.mydetails);
  let token = useSelector(state => state.cart.token);
  //console.log('My Account', token);

  useEffect(() => {
    const loadMe = async () => {
      await dispatch(userActions.GetUsersAction());
    };
    loadMe();
  }, [dispatch, mydetails]);

  // console.log(mydetails);
  // useEffect(() => {
  //   fetchMyProfile();
  //   return () => {};
  // }, []);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const config1 = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const fetchMyProfile = () => {
    axios
      .get(`${url}/users/get/me`, config)
      .then(response => {
        setdata(response.data ?? []);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const logout = () => {
    fetch(`${url}/users/logout`, config1)
      .then(async response => {
        console.log('logging out');

        dispatch(removeToken());
        await AsyncStorage.removeItem('token');
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const logoutall = () => {
    fetch(`${url}/users/logoutAll`, config1)
      .then(async response => {
        console.log('logging out');

        dispatch(removeToken());
        await AsyncStorage.removeItem('token');
      })
      .catch(function (error) {
        alert(error);
      });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.thistle}}>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 50,
              backgroundColor: '#C5C6D0',
            }}>
            <Icons name="person" size={50} color={Colors.white} />
          </View>

          <View style={styles.screen}>
            <Text style={styles.text1}>{mydetails.name}</Text>
          </View>
          <View>
            <Text style={styles.text2}>+91 - {mydetails.contactno}</Text>
            <Text style={styles.text2}>{mydetails.email}</Text>
          </View>
          <Icons
            name="create"
            color={Colors.white}
            style={{alignSelf: 'flex-end', paddingRight: 10}}
            size={20}
            onPress={() => {
              navigation.navigate(MY_DETAILS);
            }}
          />
        </View>
        <View style={styles.container2}>
          <View style={styles.myorders}>
            <View style={styles.top}>
              <Text style={styles.heading}>My Orders </Text>
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate(MY_ORDERS);
              }}>
              <Text style={styles.buttonTextStyle}>VIEW ALL ORDERS</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.myorders}>
            <View style={styles.top}>
              <Text style={styles.heading}>My Addresses </Text>
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate(MY_ADDRESS);
              }}>
              <Text style={styles.buttonTextStyle}>VIEW ALL ADDRESSES</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.myorders}>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => {
                logout();
              }}>
              <Text style={styles.buttonTextStyle}>Sign Out</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.myorders}>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => {
                logoutall();
              }}>
              <Text style={styles.buttonTextStyle}>Sign Out All </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
    paddingTop: 10,
    backgroundColor: Colors.purple,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 10,
    // shadowColor: Colors.pink,
    // shadowOpacity: 0.5,
    // shadowOffset: {width: 0, height: 3},
    // shadowRadius: 8,
    // elevation: 8,
  },
  container2: {
    backgroundColor: Colors.thistle,
    padding: 10,
  },
  screen: {
    padding: 10,
    fontSize: 29,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  text1: {
    //fontStyle: 'bold',
    color: 'white',
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 20,
    //tintColor: 'black',
  },
  text2: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  myorders: {
    //tintColor: Colors.thistle,
    textAlign: 'right',
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'white',
    marginBottom: 10,
    //borderRadius: 10,
    shadowColor: Colors.pink,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 8,
    elevation: 8,
  },
  buttonStyle: {
    margin: 10,
  },
  buttonTextStyle: {
    color: Colors.purple,
    fontSize: 18,
    alignSelf: 'flex-end',
  },
  top: {
    margin: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  heading: {
    color: 'black',
    fontSize: 20,
  },
});

export default AccountsTab;
