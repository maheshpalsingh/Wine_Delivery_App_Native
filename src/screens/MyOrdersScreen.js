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
import Colors from '../assets/theme/Colors';

const axios = require('axios');
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';

const MyordersScreen = props => {
  const [masterdata, setmasterdata] = useState([]);
  const [filtereddata, setfilterdata] = useState([]);
  const [searchdata, setsearchdata] = useState('');

  useEffect(() => {
    fetchProducts();
    return () => {};
  }, []);

  const fetchProducts = () => {
    axios
      .get(`${url}/products/all`)
      .then(response => {
        setfilterdata(response.data ?? []);
        setmasterdata(response.data ?? []);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const searchFilter = text => {
    if (text) {
      const newdata = masterdata.filter(item => {
        const itemdata = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemdata.indexOf(textData) > -1;
      });
      setfilterdata(newdata);
      setsearchdata(text);
    } else {
      setfilterdata(masterdata);
      setsearchdata(text);
    }
  };
  return (
    <ScrollView>
      <View>
        <TextInput
          style={styles.input}
          value={searchdata}
          onChangeText={text => {
            searchFilter(text);
          }}
          placeholder="Search"
          underlineColorAndroid="transparent"
        />
        <FlatList
          data={filtereddata}
          keyExtractor={item => item._id}
          {...props}
          renderItem={(
            itemdata, // {ItemView}
          ) => (
            <Card
              image={itemdata.item.image}
              winename={itemdata.item.name}
              price={itemdata.item.price}
              qtn={itemdata.item.category}
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
