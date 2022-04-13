import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import BottomtabNavigator from './BottomTabNavigator';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken} from '../store/actions/cart';

const AppNavContainer = () => {
  const [loggedIn, setloggedin] = useState(true);
  const token = useSelector(state => state.cart.token);
  const dispatch = useDispatch();
  useEffect(async () => {
    if (!token) setloggedin(false);
    try {
      await AsyncStorage.getItem('token').then(async res => {
        console.log('Response from login', JSON.parse(res));
        if (!res) {
          setloggedin(false);
        } else {
          let token = await JSON.parse(res);
          console.log('Token Index =', token);
          setloggedin(true);
          dispatch(setToken(token.token));
        }
      });
    } catch (e) {
      console.log('Error', e);
    }
  }, [token]);

  return (
    <NavigationContainer>
      {loggedIn ? <BottomtabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavContainer;
