import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ByCategory from '../components/ByCategory';
import {HomeStackScreen} from '../navigations/HomeNavigator';
import ProductsScreen from './ProductsScreen';
import HeaderButton from '../components/UI/HeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {MY_CART} from '../constants/routeName';

const Categories = props => {
  return (
    <View>
      <Text>Hey</Text>
    </View>
  );
  // return <ByCategory />;
};

Categories.navigationOptions = navData => {
  return {
    headerTitle: 'All Categories',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate(MY_CART);
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default Categories;
