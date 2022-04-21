import React, {useEffect} from 'react';
import ProductsScreen from '../screens/ProductsScreen';
import ProductoverviewScreen from '../screens/ProductOverviewScreen';
import MycartScreen from '../screens/MyCartScreen';
import MyordersScreen from '../screens/MyOrdersScreen';
import {
  ACCOUNT,
  ADD_ADDRESS,
  CATEGORIES,
  MY_ADDRESS,
  MY_CART,
  MY_DETAILS,
  MY_ORDERS,
  PRODUCTSBYCATEGORY,
  PRODUCTS_LIST,
  PRODUCTS_OVERVIEW,
} from '../constants/routeName';
import {createStackNavigator} from '@react-navigation/stack';
import Icons from 'react-native-vector-icons/Ionicons';
import Colors from '../assets/theme/Colors';
import Categories from '../screens/Categories';

import AccountsTab from '../screens/AccountsTab';
import MyDetailsScreen from '../screens/MyDetailsScreen';
import Addaddress from '../screens/ADDRESS/AddAddress';
import ViewAddress from '../screens/ADDRESS/ViewAddress';
import Productsbycategory from '../screens/ProductsByCategory';
import {useSelector} from 'react-redux';
import {Badge} from 'react-native-paper';

const screenOptions = ({navigation}) => ({
  headerRight: () => (
    <>
      <Icons
        name="cart"
        size={32}
        color={Colors.white}
        style={{paddingRight: 10}}
        onPress={() => {
          navigation.navigate(MY_CART);
        }}
      />
      <Badge
        visible={true}
        size={25}
        style={{
          backgroundColor: Colors.thistle,
          marginTop: 2,
          marginRight: 2,
          top: 0,
          position: 'absolute',
        }}>
        {global.cartLength}
      </Badge>
    </>
  ),
  headerTitleAlign: 'center',
  headerTintColor: Colors.white,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerStyle: {
    backgroundColor: Colors.purple,
  },
});

export const HomeStackScreen = ({navigation}) => {
  const HomeStack = createStackNavigator();
  const cartItems = useSelector(state => state.cart.availableOrders);
  global.cartLength = cartItems.length;
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

export const CategoryStackScreen = ({navigation}) => {
  const CategoryStack = createStackNavigator();
  return (
    <CategoryStack.Navigator screenOptions={screenOptions}>
      <CategoryStack.Screen
        name={CATEGORIES}
        component={Categories}></CategoryStack.Screen>
      <CategoryStack.Screen
        name={PRODUCTSBYCATEGORY}
        component={Productsbycategory}></CategoryStack.Screen>
      <CategoryStack.Screen
        name={MY_CART}
        component={MycartScreen}></CategoryStack.Screen>
      <CategoryStack.Screen
        name={PRODUCTS_OVERVIEW}
        component={ProductoverviewScreen}></CategoryStack.Screen>
    </CategoryStack.Navigator>
  );
};

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

      <AccountStack.Screen
        name={MY_ORDERS}
        component={MyordersScreen}></AccountStack.Screen>

      <AccountStack.Screen
        name={MY_ADDRESS}
        component={ViewAddress}></AccountStack.Screen>

      <AccountStack.Screen
        name={ADD_ADDRESS}
        component={Addaddress}></AccountStack.Screen>
    </AccountStack.Navigator>
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
