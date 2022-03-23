import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Platform, Image} from 'react-native';
const axios = require('axios');
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';
//show me responce in console, it was working before now it is not working let me restart my laptop okay?ok
const Search = () => {
  const [products, setproducts] = useState([]);
  const fetchApi = () => {
    axios
      .get(`${url}/products/all`)
      .then(response => {
        setproducts(response.data ?? []);
      })
      // .then(function (response) {
      //   const result = response.data;
      //   setproducts({result});
      //   console.log(result);
      // })
      .catch(function (error) {
        alert(error);
      });
  };

  fetchApi();
  return (
    <View>
      <Button onPress={() => fetchApi()} title="Call Api" />
      {products.map((product, index) => (
        // <Text key={index}>{product.name}</Text>
        <Image
          source={{uri: product.image}}
          style={{width: '100%', height: '100%'}}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Search;
