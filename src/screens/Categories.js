import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ByCategory from '../components/ByCategory';
import {HomeStackScreen} from '../navigations/HomeNavigator';
import ProductsScreen from './ProductsScreen';
import HeaderButton from '../components/UI/HeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {MY_CART} from '../constants/routeName';

const Categories = ({navigation}) => {
  return <ByCategory />;
};

const styles = StyleSheet.create({});

export default Categories;
