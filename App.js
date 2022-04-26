/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import AppNavContainer from './src/navigations';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import wineReducers from './src/store/reducers/products';
import cartReducers from './src/store/reducers/cart';
import userReducers from './src/store/reducers/user';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({
  wines: wineReducers,
  cart: cartReducers,
  user: userReducers,
});
import SplashScreen from 'react-native-splash-screen';
const Store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  useEffect(() => {
    <StatusBar hidden />;
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={Store}>
        <AppNavContainer />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
