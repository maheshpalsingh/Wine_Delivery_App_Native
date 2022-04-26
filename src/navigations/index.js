import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import BottomtabNavigator from './BottomTabNavigator';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken} from '../store/actions/cart';
import {ActivityIndicator} from 'react-native-paper';
import Colors from '../assets/theme/Colors';

const AppNavContainer = () => {
  const [loggedIn, setloggedin] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const token = useSelector(state => state.cart.token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) setloggedin(false);
    try {
      AsyncStorage.getItem('token').then(async res => {
        //console.log('Response from login', JSON.parse(res));
        if (!res) {
          setloggedin(false);
        } else {
          let token = await JSON.parse(res);
          setloggedin(true);
          dispatch(setToken(token.token));
        }
        setLoading(false);
      });
    } catch (e) {
      console.log('Error', e);
    }
  }, [token]);

  if (isLoading) {
    return (
      <ActivityIndicator
        size={'large'}
        color={Colors.purple}
        style={{
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      />
    );
  }

  return (
    <NavigationContainer>
      {loggedIn && !isLoading ? <BottomtabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavContainer;
