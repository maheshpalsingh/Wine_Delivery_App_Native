import React from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Colors from '../assets/theme/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  AccountStackScreen,
  CategoryStackScreen,
  HomeStackScreen,
} from './HomeNavigator';
import {ACCOUNT} from '../constants/routeName';

const Tab = createMaterialBottomTabNavigator();

const BottomtabNavigator = ({navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor={Colors.white}
      barStyle={{backgroundColor: Colors.purple}}>
      <Tab.Screen
        name="Feed"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'PRODUCTS',
          tabBarIcon: ({color}) => <Icon name="wine" color={color} size={28} />,
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
      <Tab.Screen
        name={ACCOUNT}
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
