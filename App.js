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
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import wineReducers from './src/store/reducers/products';
import cartReducers from './src/store/reducers/cart';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({
  wines: wineReducers,
  cart: cartReducers,
});

const Store = createStore(rootReducer, applyMiddleware(thunk));

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
