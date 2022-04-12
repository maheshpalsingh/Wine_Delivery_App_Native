import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerNavigator from './DrawerNavigator';
import Colors from '../assets/theme/Colors';
import {
  AccountStackScreen,
  CartStackScreen,
  CategoryStackScreen,
  HomeStackScreen,
  OrdersStackScreen,
  SearchStackScreen,
} from './HomeNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import Categories from '../screens/Categories';
import {
  ACCOUNT,
  CATEGORIES,
  MY_ORDERS,
  PRODUCTS_LIST,
  SEARCH,
} from '../constants/routeName';
import Search from '../screens/Search';
import ProductsScreen from '../screens/ProductsScreen';
import ProductoverviewScreen from '../screens/ProductOverviewScreen';
import MycartScreen from '../screens/MyCartScreen';
import MyordersScreen from '../screens/MyOrdersScreen';
import Settings from '../screens/Settings';

const Tab = createMaterialBottomTabNavigator();
const BottomtabNavigator = ({navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName="Categories"
      activeColor={Colors.white}
      barStyle={{backgroundColor: Colors.purple}}>
      <Tab.Screen
        name="Feed"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'PRODUCTS',
          tabBarIcon: ({color}) => <Icon name="wine" size={28} />,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoryStackScreen}
        headerTitle="Cat"
        options={{
          title: 'Categories',
          tabBarLabel: 'Categories',
          tabBarIcon: ({color}) => <Icon name="list" color={color} size={26} />,
        }}
      />
      {/* <Tab.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          tabBarLabel: 'My Orders',
          tabBarIcon: ({color}) => (
            <Icon name="search" color={color} size={26} />
          ),
        }}
      /> */}
      <Tab.Screen
        name={ACCOUNT}
        //component={(MY_ORDERS, {screen: MyordersScreen})}
        component={AccountStackScreen}
        options={{
          tabBarLabel: 'My Account',
          tabBarIcon: ({color}) => (
            <Icon name="pencil" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default BottomtabNavigator;

// const screenOptions = {
//   headerRight: () => (
//     <Icon
//       name="cart"
//       size={32}
//       style={{paddingRight: 10}}
//       onPress={() => {
//         navigate(MY_CART);
//       }}
//     />
//   ),
//   headerTitleAlign: 'center',
//   headerTintColor: Colors.grey,
//   headerTitleStyle: {
//     fontWeight: 'bold',
//   },
//   headerStyle: {
//     backgroundColor: Colors.purple,
//   },
// };

// // const menuButton = {
// //   headerLeft: () => (
// //     <Icon
// //       name="menu"
// //       size={32}
// //       style={{paddingLeft: 10}}
// //       onPress={() => {
// //         navigation.openDrawer();
// //       }}
// //     />
// //   ),
// // };

// const HomeStackScreen = ({navigation}) => {
//   const HomeStack = createStackNavigator();
//   return (
//     <HomeStack.Navigator screenOptions={screenOptions}>
//       <HomeStack.Screen
//         name={PRODUCTS_LIST}
//         component={ProductsScreen}
//         // options={menuButton}
//         options={{
//           headerLeft: () => (
//             <Icon
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

// const SettingsStackScreen = ({navigation}) => {
//   const SettingsStack = createStackNavigator();
//   return (
//     <SettingsStack.Navigator screenOptions={screenOptions}>
//       <SettingsStack.Screen
//         name={SETTINGS}
//         component={Settings}
//         options={{
//           headerLeft: () => (
//             <Icon
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

// const OrdersStackScreen = ({navigation}) => {
//   const OrdersStack = createStackNavigator();
//   return (
//     <OrdersStack.Navigator screenOptions={screenOptions}>
//       <OrdersStack.Screen
//         name={MY_ORDERS}
//         component={MyordersScreen}
//         options={{
//           headerLeft: () => (
//             <Icon
//               name="menu"
//               size={32}
//               style={{paddingLeft: 10}}
//               onPress={() => {
//                 navigation.openDrawer();
//               }}
//             />
//           ),
//         }}></OrdersStack.Screen>
//     </OrdersStack.Navigator>
//   );
// };

// const LogoutStackScreen = ({navigation}) => {
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
