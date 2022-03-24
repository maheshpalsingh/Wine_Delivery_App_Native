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
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {wineReducers} from './src/store/reducers/product';

const rootReducer = combineReducers({
  wines: wineReducers,
});

const Store = createStore(rootReducer);

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={Store}>
        <AppNavContainer />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
