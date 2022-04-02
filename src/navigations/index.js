import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import AuthNavigator from './AuthNavigator';
import BottomtabNavigator from './BottomTabNavigator';
import {useSelector} from 'react-redux';

const AppNavContainer = () => {
  let loggedIn = true;
  const token = useSelector(state => state.cart.token);
  console.log(token);
  if (token != null) {
    loggedIn = true;
  } else {
    loggedIn = false;
  }

  const MainNavigator = createStackNavigator();

  return (
    <NavigationContainer>
      {loggedIn ? <BottomtabNavigator /> : <AuthNavigator />}
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
