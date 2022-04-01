import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  Image,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../assets/theme/Colors';
import {WineCard} from '../components/WineComponent';
import {PRODUCTS_OVERVIEW} from '../constants/routeName';
const axios = require('axios');
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';
//show me responce in console, it was working before now it is not working let me restart my laptop okay?ok
const Search = props => {
  const [masterdata, setmasterdata] = useState([]);
  const [filtereddata, setfilterdata] = useState([]);
  const [searchdata, setsearchdata] = useState('');
  const token = useSelector(state => state.cart.token);

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
    <View>
      <TextInput
        style={styles.input}
        value={searchdata}
        onChangeText={text => {
          searchFilter(text);
        }}
        placeholder="Search"
        underlineColorAndroid="transparent"
        focusable={true}
      />
      <ScrollView>
        <FlatList
          data={filtereddata}
          keyExtractor={item => item._id}
          {...props}
          renderItem={itemData => (
            <WineCard
              image={itemData.item.image}
              winename={itemData.item.name}
              price={itemData.item.price}
              category={itemData.item.category}>
              <Button
                title="Add To Cart"
                color={Colors.purple}
                onPress={() => {
                  // setVisible(true);
                  // setTimeout(() => {
                  //   setVisible(false);
                  // }, 500);
                  const addProduct = itemData.item._id;
                  // console.log(addProduct, token);
                  // const token =
                  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ2N2VmOTM3MDZkNDFmZmQwYzMxMDEiLCJpYXQiOjE2NDg3ODg0Njl9.IqqAwqZZ2F_YYQFQL13g3MS9TKztYa69KlylfQ3uaXw';
                  const pid = '62469cc7874f4f9e9497d669';
                  console.log(pid, token);
                  const config = {
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                      // 'Content-Length': 0,
                    },
                  };
                  console.log('123', `${url}/cart/${addProduct}`);
                  axios
                    //.post(`localhost:3001/cart/${addProduct}`, config)
                    //.post(`http://127.0.0.1:3001/cart/${addProduct}`, config)
                    .post(`${url}/cart/${addProduct}`, config)
                    .then(function (response) {
                      console.log('Success');
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                }}
              />
              <View style={{paddingTop: 5}}>
                <Button
                  title="More Info"
                  onPress={productId => {
                    props.navigation.navigate(PRODUCTS_OVERVIEW, {
                      productDescription: itemData.item.description,
                      productimage: itemData.item.image,
                      productPrice: itemData.item.price,
                      productCategory: itemData.item.category,
                      productName: itemData.item.name,
                      productCompany: itemData.item.company,
                    });
                  }}
                />
              </View>
            </WineCard>
          )}
        />
      </ScrollView>
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
  add_to_cart: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 20,
    flex: 2,
    // justifyContent: 'center',
    width: 200,
    height: 110,
    paddingRight: 10,
  },
});
export default Search;
