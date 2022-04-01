import React from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  ImageBackground,
  Image,
  StyleSheet,
} from 'react-native';

import {useSelector} from 'react-redux';
import Colors from '../assets/theme/Colors';

const ProductoverviewScreen = props => {
  // console.log(props.route);
  const {
    productimage,
    productDescription,
    productCategory,
    productName,
    productPrice,
    productCompany,
  } = props.route.params;

  return (
    <>
      <View style={styles.screen}>
        <Image source={{uri: productimage}} style={styles.image} />
        <ScrollView>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={styles.heading}>Name:</Text>
            <Text style={styles.text}>{productName}</Text>
            <Text style={styles.heading}>Company:</Text>
            <Text style={styles.text}>{productCompany}</Text>
            <Text style={styles.heading}>About me:</Text>
            <Text style={styles.text}>{productDescription}</Text>
            <Text style={styles.heading}>Quantity:</Text>
            <Text style={styles.text}>{productCategory}</Text>
            <Text style={styles.heading}>Price:</Text>
            <Text style={styles.text}>${productPrice}</Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    height: '100%',
    width: '30%',
  },
  text: {
    color: Colors.purple,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: Colors.thistle,
  },
  heading: {
    padding: 16,
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: Colors.thistle,
  },
});

export default ProductoverviewScreen;
