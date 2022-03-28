import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import Colors from '../assets/theme/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import * as cartActions from '../store/actions/cart';

export const WineImage = () => {
  return (
    <>
      <Image
        source={{
          uri: 'https://iwsc.net/img/blog/medium-iwscawards114pre-dinner6184.jpg',
          //  uri: 'http://localhost:3001/profile/profile_1648008686086profile-pic.jpg',
        }}
        style={styles.screenimage}
      />
      <TouchableOpacity style={{position: 'absolute', right: 20, top: 20}}>
        <Icon name="heart-outline" size={25} color={Colors.white} />
      </TouchableOpacity>
    </>
  );
};

export const WineCard = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.wine_card}>
      <View style={{padding: 10}}>
        <Image
          source={{
            uri: props.image,
          }}
          style={styles.wine_image}
        />
      </View>
      <View style={{padding: 10}}>
        <Text style={styles.txt_name}>{props.winename}</Text>
        <Text style={styles.txt_price}>{props.price}</Text>
        <Text style={styles.txt_category}>{props.category}</Text>
      </View>
      <View style={styles.add_to_cart}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenimage: {width: '100%', height: 150, paddingBottom: 20},
  wine_card: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 20,
    flexDirection: 'row',
    shadowColor: Colors.purple,
    shadowOpacity: 0.56,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 8,
    elevation: 5,
  },
  wine_image: {
    width: 80,
    height: 100,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOpacity: 0.56,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 8,
    elevation: 5,
  },
  txt_name: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  txt_price: {
    paddingBottom: 10,
    fontSize: 15,
  },
  txt_category: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  add_to_cart: {
    paddingTop: 70,
    paddingLeft: 20,
    flex: 1,
    justifyContent: 'center',
    width: 200,
    height: 110,
    paddingRight: 10,
  },
});
