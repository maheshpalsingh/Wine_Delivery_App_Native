import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Platform, Button} from 'react-native';
import Colors from '../assets/theme/Colors';

const axios = require('axios');
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';

const MyordersScreen = () => {
  const [products, setproducts] = useState([]);
  axios
    .get(`${url}/products/all`)
    .then(response => {
      setproducts(response.data ?? []);
    })
    .catch(function (error) {
      alert(error);
    });
  return (
    <View>
      {products.map((product, index) => (
        <View key={index}>
          <MyOrders
            image={product.image}
            winename={product.name}
            price={product.price}
            qtn={product.category}
          />
        </View>
      ))}
    </View>
  );
};

const MyOrders = props => (
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
      <Text style={styles.txt_qtn}>{props.qtn}</Text>
    </View>
  </View>
);
const styles = StyleSheet.create({
  screenimage: {width: '100%', height: 150, paddingBottom: 20},
  wine_card: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 20,
    flexDirection: 'row',
  },
  wine_image: {width: 80, height: 100, borderRadius: 20},
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
  txt_qtn: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
});

export default MyordersScreen;
