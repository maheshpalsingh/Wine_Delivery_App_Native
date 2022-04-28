import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {LOGIN, REGISTER, RESET_PASSWORD} from '../constants/routeName';
import Colors from '../assets/theme/Colors';
import Forgetpassword from '../screens/ForgetPassword';

const AuthNavigator = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator initialRouteName={LOGIN}>
      <AuthStack.Screen
        name={LOGIN}
        options={styles.header}
        component={LoginScreen}></AuthStack.Screen>
      <AuthStack.Screen
        name={REGISTER}
        options={styles.header}
        component={RegisterScreen}></AuthStack.Screen>
      <AuthStack.Screen
        name={RESET_PASSWORD}
        options={styles.header}
        component={Forgetpassword}></AuthStack.Screen>
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
