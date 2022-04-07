import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import AuthNavigator from './AuthNavigator';
import BottomtabNavigator from './BottomTabNavigator';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AppNavContainer = () => {
  let loggedIn = true;
  const token = useSelector(state => state.cart.token);
  if (token != null) {
    loggedIn = false;
  } else {
    loggedIn = false;
  }

  // let a = AsyncStorage.getItem('token').then(res => {
  //   console.log('ResponseA', JSON.stringify(res));
  // });
  // let ab = AsyncStorage.removeItem('token').then(res => {
  //   console.log('Response removed', res);
  // });

  // const [isloggedin, setisloggedin] = useState(null);
  // useEffect(() => {
  //   let token = AsyncStorage.getItem('token').then(res => {
  //     console.log('Response from login', JSON.stringify(res));
  //     if (res) {
  //       setisloggedin(true);
  //     } else {
  //       setisloggedin(false);
  //     }
  //   });
  // });

  return (
    <NavigationContainer>
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
