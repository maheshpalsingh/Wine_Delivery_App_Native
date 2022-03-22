import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import DrawerNavigator from './DrawerNavigator';
import AuthNavigator from './AuthNavigator';
import BottomtabNavigator from './BottomTabNavigator';

const AppNavContainer = () => {
  let loggedIn = false;
  return (
    <NavigationContainer>
      {loggedIn ? <BottomtabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavContainer;
