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
  ACCOUNT,
  CATEGORIES,
  LOGIN,
  MY_CART,
  MY_DETAILS,
  MY_ORDERS,
  PRODUCTS_LIST,
  PRODUCTS_OVERVIEW,
  SEARCH,
  SETTINGS,
} from '../constants/routeName';

import Icons from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';
import Colors from '../assets/theme/Colors';
import Categories from '../screens/Categories';
import Search from '../screens/Search';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AccountsTab from '../screens/AccountsTab';
import MyDetailsScreen from '../screens/MyDetailsScreen';

// const screenOptions = ({navigation, route}) => ({
const screenOptions = ({navigation}) => ({
  headerRight: () => (
    <Icons
      name="cart"
      size={32}
      style={{paddingRight: 10}}
      onPress={() => {
        // navigation.navigate('MY_CART', {screen: MycartScreen});
        navigation.navigate(MY_CART);
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
});

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

export const HomeStackScreen = ({navigation}) => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator
      initialRouteName={PRODUCTS_LIST}
      screenOptions={screenOptions}>
      <HomeStack.Screen
        name={PRODUCTS_LIST}
        component={ProductsScreen}></HomeStack.Screen>
      <HomeStack.Screen
        name={PRODUCTS_OVERVIEW}
        component={ProductoverviewScreen}></HomeStack.Screen>
      <HomeStack.Screen
        name={MY_CART}
        component={MycartScreen}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

// export const HomeStackScreen = ({navigation}) => {
//   // const navigation = useNavigation();
//   const HomeStack = createStackNavigator();
//   return (
//     <HomeStack.Navigator
//       screenOptions={({navigation}) => ({
//         headerRight: () => (
//           <Icons
//             name="cart"
//             size={32}
//             style={{paddingRight: 10}}
//             onPress={() => {
//               // navigation.navigate('MY_CART', {screen: MycartScreen});
//               navigation.navigate('CartStackScreen');
//             }}
//           />
//         ),
//         headerTitleAlign: 'center',
//         headerTintColor: Colors.grey,
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//         headerStyle: {
//           backgroundColor: Colors.purple,
//         },
//       })}>
//       <HomeStack.Screen
//         name={PRODUCTS_LIST}
//         component={ProductsScreen}
//         options={{
//           headerLeft: () => (
//             <Icons
//               name="menu"
//               size={32}
//               style={{paddingLeft: 10}}
//               onPress={() => {
//                 navigation.openDrawer();
//               }}
//             />
//           ),
//         }}></HomeStack.Screen>
//     </HomeStack.Navigator>
//   );
// };

export const CategoryStackScreen = ({navigation}) => {
  // const navigation = useNavigation();
  const CategoryStack = createStackNavigator();
  return (
    <CategoryStack.Navigator screenOptions={screenOptions}>
      <CategoryStack.Screen
        name={CATEGORIES}
        component={Categories}></CategoryStack.Screen>
    </CategoryStack.Navigator>
  );
};

// export const SettingsStackScreen = ({navigation}) => {
//   // const navigation = useNavigation();
//   const SettingsStack = createStackNavigator();
//   return (
//     <SettingsStack.Navigator screenOptions={screenOptions}>
//       <SettingsStack.Screen
//         name={SETTINGS}
//         component={Settings}
//         options={{
//           headerLeft: () => (
//             <Icons
//               name="menu"
//               size={32}
//               style={{paddingLeft: 10}}
//               onPress={() => {
//                 navigation.openDrawer();
//               }}
//             />
//           ),
//         }}></SettingsStack.Screen>
//     </SettingsStack.Navigator>
//   );
// };

export const OrdersStackScreen = ({navigation}) => {
  const OrdersStack = createStackNavigator();
  return (
    <OrdersStack.Navigator screenOptions={screenOptions}>
      <OrdersStack.Screen
        name={MY_ORDERS}
        component={MyordersScreen}></OrdersStack.Screen>
    </OrdersStack.Navigator>
  );
};

export const AccountStackScreen = ({navigation}) => {
  const AccountStack = createStackNavigator();
  return (
    <AccountStack.Navigator screenOptions={screenOptions}>
      <AccountStack.Screen
        name={ACCOUNT}
        component={AccountsTab}></AccountStack.Screen>
      <AccountStack.Screen
        name={MY_DETAILS}
        component={MyDetailsScreen}></AccountStack.Screen>
    </AccountStack.Navigator>
  );
};

export const SearchStackScreen = ({navigation}) => {
  // const navigation = useNavigation();
  const SearchStack = createStackNavigator();
  return (
    <SearchStack.Navigator screenOptions={screenOptions}>
      <SearchStack.Screen name={SEARCH} component={Search}></SearchStack.Screen>
      <SearchStack.Screen
        name={PRODUCTS_OVERVIEW}
        component={ProductoverviewScreen}></SearchStack.Screen>
    </SearchStack.Navigator>
  );
};

export const CartStackScreen = ({navigation}) => {
  // const navigation = useNavigation();
  const CartStack = createStackNavigator();
  return (
    <CartStack.Navigator screenOptions={screenOptions}>
      <CartStack.Screen
        name={MY_CART}
        component={MycartScreen}></CartStack.Screen>
    </CartStack.Navigator>
  );
};

// export const LogoutStackScreen = ({navigation}) => {
//   // const navigation = useNavigation();
//   const LogoutStack = createStackNavigator();
//   return (
//     <LogoutStack.Navigator
//       screenOptions={{
//         headerTitleAlign: 'center',
//         headerTintColor: Colors.grey,
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//         headerStyle: {
//           backgroundColor: Colors.purple,
//         },
//       }}>
//       <LogoutStack.Screen
//         name={LOGIN}
//         component={LoginScreen}></LogoutStack.Screen>
//     </LogoutStack.Navigator>
//   );
// };
