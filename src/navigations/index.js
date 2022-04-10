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
    console.log('Index 15 =', token, loggedIn);
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
      console.log('eeerrrooorrr', e);
    }
  }, [token]);
  // let a = AsyncStorage.getItem('token').then(res => {
  //   console.log('ResponseA', JSON.stringify(res));
  // });
  // let ab = AsyncStorage.removeItem('token').then(res => {
  //   console.log('Response removed', res);
  // });

  // const [isloggedin, setisloggedin] = useState(null);
  // useEffect(async () => {
  //   await AsyncStorage.getItem('token').then(res => {
  //     console.log('Response from login', JSON.parse(res));
  //     if (res) {
  //       setisloggedin(true);
  //     } else {
  //       setisloggedin(false);
  //     }
  //   });
  // }, [isloggedin]);

  return (
    <NavigationContainer>
      {console.log('39 ', loggedIn)}
      {loggedIn ? <BottomtabNavigator /> : <AuthNavigator />}
      {/* {isloggedin ? <BottomtabNavigator /> : <AuthNavigator />} */}
    </NavigationContainer>
  );
};

export default AppNavContainer;
//export default createAppContainer(MainNavigator);
// <Stack.Navigator>
//   <Stack.Screen
//     name="AuthNavigator"
//     component={AuthNavigator}
//     options={{headerShown: false}}
//   />
//   <Stack.Screen
//     name="DrawerNavigatorRoutes"
//     component={BottomtabNavigator}
//     options={{headerShown: false}}
//   />
// </Stack.Navigator>;
