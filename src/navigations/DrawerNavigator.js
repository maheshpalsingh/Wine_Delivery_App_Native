import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  HomeStackScreen,
  LogoutStackScreen,
  OrdersStackScreen,
  SettingsStackScreen,
} from './HomeNavigator';

import {HOME_NAVIGATOR, SETTINGS} from '../constants/routeName';
import 'react-native-gesture-handler';
import Colors from '../assets/theme/Colors';

import Icons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name={HOME_NAVIGATOR}
        component={HomeStackScreen}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icons
              name="md-home"
              size={size}
              color={focused ? Colors.purple : '#ccc'}
            />
          ),
        }}></Drawer.Screen>
      <Drawer.Screen
        name="My Orders"
        component={OrdersStackScreen}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icons
              name="cart"
              size={size}
              color={focused ? Colors.purple : '#ccc'}
            />
          ),
        }}></Drawer.Screen>
      <Drawer.Screen
        name={SETTINGS}
        component={SettingsStackScreen}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icons
              name="settings"
              size={size}
              color={focused ? Colors.purple : '#ccc'}
            />
          ),
        }}></Drawer.Screen>
      <Drawer.Screen
        name="Logout"
        component={LogoutStackScreen}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icons
              name="log-out"
              size={size}
              color={focused ? Colors.purple : '#ccc'}
            />
          ),
        }}></Drawer.Screen>
      <Drawer.Screen
        name="Terms & Conditions"
        component={HomeStackScreen}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icons
              name="md-home"
              size={size}
              color={focused ? Colors.purple : '#ccc'}
            />
          ),
        }}></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
