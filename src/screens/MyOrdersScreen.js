import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import Colors from '../assets/theme/Colors';

const axios = require('axios');
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';

//let token =
//'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ5MzIyMGUwM2UyZDcyNjY5OGIzM2IiLCJpYXQiOjE2NDkwNjMxMDh9.YjatjbKxIhBggJh_d7Erw8vjv_IiARbS5-zgMDoiG50';

const MyordersScreen = props => {
  const [masterdata, setmasterdata] = useState([]);
  let token = useSelector(state => state.cart.token);
  useEffect(() => {
    fetchProducts();
    return () => {};
  }, []);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const fetchProducts = () => {
    axios
      .get(`${url}/orders/my`, config)
      .then(response => {
        setmasterdata(response.data ?? []);
        //console.log(masterdata);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  return (
    <ScrollView>
      <View>
        <FlatList
          data={masterdata}
          keyExtractor={item => item._id}
          {...props}
          renderItem={(
            itemdata, // {ItemView}
          ) => (
            <Card
              image={itemdata.item.image}
              winename={itemdata.item.products[0]}
              Total={itemdata.item.total}
              qtn={itemdata.item.products.length}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

const Card = props => (
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
      <Text style={styles.txt_price}>Total:{props.Total}</Text>
      <Text style={styles.txt_qtn}>No.of Products:{props.qtn}</Text>
      <Text style={styles.txt_name}>{props.winename}</Text>
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
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    backgroundColor: 'white',
    margin: 5,
    paddingLeft: 15,
  },
});

export default MyordersScreen;
