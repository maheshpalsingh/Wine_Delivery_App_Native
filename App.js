/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView} from 'react-native';
import AppNavContainer from './src/navigations';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <AppNavContainer />
    </SafeAreaView>
  );
};

export default App;
