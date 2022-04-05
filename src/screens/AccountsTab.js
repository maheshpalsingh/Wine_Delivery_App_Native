import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  TouchableHighlightBase,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../assets/theme/Colors';
import {LOGIN, MY_DETAILS, MY_ORDERS} from '../constants/routeName';
const axios = require('axios');
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';
import Icons from 'react-native-vector-icons/Ionicons';
const AccountsTab = ({navigation}) => {
  const [data, setdata] = useState('');
  let token = useSelector(state => state.cart.token);
  //let token =
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ5MzIyMGUwM2UyZDcyNjY5OGIzM2IiLCJpYXQiOjE2NDg5NjQxNTZ9.MjqLpNq5rA1f3IbrtY-8mrOmTUjQ0Fy_JZcxL336HHA';
  useEffect(() => {
    fetchMyProfile();
    return () => {};
  }, [data]);
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
      .then(response => {
        console.log('logging out');
        navigation.navigate('AuthNavigatorroute');
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const logoutall = () => {
    fetch(`${url}/users/logoutAll`, config1)
      .then(response => {
        console.log('logging out');
        navigation.navigate('AuthNavigatorroute');
      })
      .catch(function (error) {
        alert(error);
      });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.thistle}}>
      <View
        style={{
          margin: 15,
          backgroundColor: 'white',
          borderRadius: 10,
        }}>
        <View style={styles.screen}>
          <Text style={styles.text1}>{data.name}</Text>
          <Button
            title="EDIT"
            color={Colors.purple}
            onPress={() => {
              navigation.navigate(MY_DETAILS);
            }}
          />
        </View>
        <View style={styles.text2}>
          <Text>+91 - {data.contactno}</Text>
          <Icons name="disc" color={Colors.purple} />
          <Text>{data.email}</Text>
          <Icons name="disc" color={Colors.purple} />
          <Text>{data.age}</Text>
        </View>
        <View style={styles.myorders}>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate(MY_ORDERS);
            }}>
            <Text style={styles.buttonTextStyle}>My Orders</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    fontSize: 29,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  text1: {
    //fontStyle: 'bold',
    fontWeight: '700',
    fontSize: 20,
    tintColor: 'black',
  },
  text2: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingBottom: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1.5,
  },
  myorders: {
    //tintColor: Colors.thistle,
    textAlign: 'left',
    borderBottomWidth: 1,
  },
  buttonStyle: {
    margin: 10,
  },
  buttonTextStyle: {
    fontSize: 18,
  },
});

export default AccountsTab;
