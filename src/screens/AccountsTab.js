import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Share,
} from 'react-native';
const axios = require('axios');
import AsyncStorage from '@react-native-async-storage/async-storage';
import {removeToken, setToken} from '../store/actions/cart';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../assets/theme/Colors';
import {MY_ADDRESS, MY_DETAILS, MY_ORDERS, URL} from '../constants/routeName';
import * as userActions from '../store/actions/user';
import Icons from 'react-native-vector-icons/Ionicons';

const AccountsTab = ({navigation}) => {
  const dispatch = useDispatch();
  const mydetails = useSelector(state => state.user.mydetails);
  let token = useSelector(state => state.cart.token);

  useEffect(() => {
    const loadMe = async () => {
      await dispatch(userActions.GetUsersAction());
    };
    loadMe();
  }, [dispatch, mydetails]);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const logout = () => {
    fetch(`${URL}/users/logout`, config)
      .then(async response => {
        dispatch(removeToken());
        await AsyncStorage.removeItem('token');
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const logoutall = () => {
    fetch(`${URL}/users/logoutAll`, config)
      .then(async response => {
        dispatch(removeToken());
        await AsyncStorage.removeItem('token');
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
        title: 'AAAAAAAAAA',
      });
      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {
      //     // shared with activity type of result.activityType
      //   } else {
      //     // shared
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   // dismissed
      // }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.thistle}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View
            style={{
              borderWidth: 2,
              borderColor: 'white',
              backgroundColor: '#C5C6D0',
            }}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'https://st3.depositphotos.com/1007566/13129/v/950/depositphotos_131295836-stock-illustration-businessman-character-avatar-icon.jpg',
              }}
            />
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
              <Icons
                color={Colors.purple}
                name="folder"
                size={24}
                style={{paddingLeft: 10, paddingRight: 10}}
              />

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
              <Icons
                name="navigate"
                size={24}
                color={Colors.purple}
                style={{paddingLeft: 10, paddingRight: 10}}
              />
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
              style={styles.buttonStyle1}
              activeOpacity={0.5}
              onPress={() => {
                logout();
              }}>
              <Icons
                color={Colors.purple}
                name="log-out"
                size={24}
                style={{paddingLeft: 10, paddingRight: 10}}
              />
              <Text style={styles.buttonTextStyle}>Sign Out</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.myorders}>
            <TouchableOpacity
              style={styles.buttonStyle1}
              activeOpacity={0.5}
              onPress={() => {
                logoutall();
              }}>
              <Icons
                color={Colors.purple}
                name="log-out"
                size={24}
                style={{paddingLeft: 10, paddingRight: 10}}
              />
              <Text style={styles.buttonTextStyle}>Sign Out All </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.myorders}>
            <TouchableOpacity
              style={styles.buttonStyle1}
              activeOpacity={0.5}
              onPress={onShare}>
              <Icons
                color={Colors.purple}
                name="share"
                size={24}
                style={{paddingLeft: 10, paddingRight: 10}}
              />
              <Text style={styles.buttonTextStyle}>Share me</Text>
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
  },
  tinyLogo: {
    width: 60,
    height: 50,
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
    color: 'white',
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 22,
  },
  text2: {
    fontSize: 15,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  myorders: {
    textAlign: 'right',
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'white',
    marginBottom: 10,
    shadowColor: Colors.pink,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 8,
    elevation: 8,
  },
  buttonStyle: {
    margin: 10,
  },
  buttonStyle1: {
    margin: 10,
    flexDirection: 'row',
  },
  buttonTextStyle: {
    color: Colors.purple,
    fontSize: 18,
    alignSelf: 'flex-end',
  },
  top: {
    flexDirection: 'row',
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
