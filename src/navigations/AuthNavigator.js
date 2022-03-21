import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {LOGIN, REGISTER} from '../constants/routeName';
import Colors from '../assets/theme/Colors';
const AuthNavigator = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={LOGIN}
        options={styles.header}
        component={LoginScreen}></AuthStack.Screen>

      <AuthStack.Screen
        name={REGISTER}
        options={styles.header}
        component={RegisterScreen}></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    headerTintColor: Colors.grey,
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: Colors.purple,
    },
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

export default AuthNavigator;
