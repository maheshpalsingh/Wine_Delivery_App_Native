import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import ProductsScreen from '../screens/ProductsScreen';
import ProductoverviewScreen from '../screens/ProductOverviewScreen';
import MycartScreen from '../screens/MyCartScreen';
import MyordersScreen from '../screens/MyOrdersScreen';
import Settings from '../screens/Settings';
import LoginScreen from '../screens/LoginScreen';

import {createStackNavigator} from '@react-navigation/stack';

import {
  LOGIN,
  MY_CART,
  MY_ORDERS,
  PRODUCTS_LIST,
  PRODUCTS_OVERVIEW,
} from '../constants/routeName';

import Icons from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';
import Colors from '../assets/theme/Colors';

// const screenOptions = ({navigation, route}) => ({
const screenOptions = {
  headerRight: () => (
    <Icons
      name="cart"
      size={32}
      style={{paddingRight: 10}}
      onPress={() => {
        navigation.navigate(MycartScreen);
      }}
    />
  ),
  headerTitleAlign: 'center',
  headerTintColor: Colors.grey,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerStyle: {
    backgroundColor: Colors.purple,
  },
};

// const Menu = {
//   headerLeft: () => (
//     <Icons
//       name="menu"
//       size={32}
//       style={{paddingLeft: 10}}
//       onPress={() => {
//         navigation.openDrawer();
//       }}
//     />
//   ),
// };

export const HomeStackScreen = () => {
  const navigation = useNavigation();
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen
        name={PRODUCTS_LIST}
        component={ProductsScreen}
        options={{
          headerLeft: () => (
            <Icons
              name="menu"
              size={32}
              style={{paddingLeft: 10}}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

export const SettingsStackScreen = () => {
  const navigation = useNavigation();
  const SettingsStack = createStackNavigator();
  return (
    <SettingsStack.Navigator screenOptions={screenOptions}>
      <SettingsStack.Screen
        name={SETTINGS}
        component={Settings}
        options={{
          headerLeft: () => (
            <Icons
              name="menu"
              size={32}
              style={{paddingLeft: 10}}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}></SettingsStack.Screen>
    </SettingsStack.Navigator>
  );
};

export const OrdersStackScreen = () => {
  const navigation = useNavigation();
  const OrdersStack = createStackNavigator();
  return (
    <OrdersStack.Navigator screenOptions={screenOptions}>
      <OrdersStack.Screen
        name={MY_ORDERS}
        component={MyordersScreen}
        options={{
          headerLeft: () => (
            <Icons
              name="menu"
              size={32}
              style={{paddingLeft: 10}}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}></OrdersStack.Screen>
    </OrdersStack.Navigator>
  );
};

export const CartStackScreen = () => {
  const navigation = useNavigation();
  const CartStack = createStackNavigator();
  return (
    <CartStack.Navigator screenOptions={screenOptions}>
      <CartStack.Screen
        name={MY_CART}
        component={MycartScreen}
        options={{
          headerLeft: () => (
            <Icons
              name="menu"
              size={32}
              style={{paddingLeft: 10}}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}></CartStack.Screen>
    </CartStack.Navigator>
  );
};
export const LogoutStackScreen = () => {
  const navigation = useNavigation();
  const LogoutStack = createStackNavigator();
  return (
    <LogoutStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: Colors.grey,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: Colors.purple,
        },
      }}>
      <LogoutStack.Screen
        name={LOGIN}
        component={LoginScreen}></LogoutStack.Screen>
    </LogoutStack.Navigator>
  );
};
