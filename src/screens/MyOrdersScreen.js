import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Platform, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import Colors from '../assets/theme/Colors';

const axios = require('axios');
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';

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
        // console.log(masterdata);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <FlatList
          data={masterdata}
          keyExtractor={item => item._id}
          {...props}
          renderItem={itemdata => (
            <Card
              Total={itemdata.item.total}
              totqtn={itemdata.item.products.length}
              winename={itemdata.item.name}
              wineprice={itemdata.item.price}
              wineqty={itemdata.item.qty}
              image={itemdata.item.image}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

const Card = props => (
  <View style={styles.wine_card}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
      }}>
      <Text style={styles.txt_qtn}>Final Amount: $ {props.Total}</Text>
      <Text style={styles.txt_qtn}>Total Products: {props.totqtn}</Text>
    </View>
    {props.winename.map((name, i) => {
      return (
        <View key={name} style={styles.screen}>
          <Image source={{uri: props.image[i]}} style={styles.image} />
          <View
            style={{
              alignSelf: 'flex-start',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.txt_name}>{name.toUpperCase()}</Text>
            <Text style={styles.txt_name}>Qty:{props.wineqty[i]}</Text>
          </View>
          <View
            style={{
              margin: 5,
              alignSelf: 'flex-start',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Text style={{fontSize: 18, paddingRight: 5, fontWeight: 'bold'}}>
              ${props.wineprice[i]}/-
            </Text>
          </View>
        </View>
      );
    })}
  </View>
);
const styles = StyleSheet.create({
  screen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F2C1D1' + 88,
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    padding: 10,
  },
  item: {
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  wine_card: {
    margin: 15,
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 20,
    borderRadius: 20,
    shadowColor: Colors.black,
    shadowOpacity: 0.5,
    shadowOffset: {width: 3, height: 3},
    shadowRadius: 8,
    elevation: 8,
  },
  txt_name: {
    fontFamily: 'sans-serif-medium',
    flex: 1,
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    margin: 5,
  },

  txt_qtn: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingBottom: 10,
  },

  image: {
    width: '20%',
    height: '100%',
    borderRadius: 20,
    marginLeft: 10,
  },
});

export default MyordersScreen;
