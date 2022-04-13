import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Platform,
  Button,
  TextInput,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {WineCard, WineImage} from '../components/WineComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import Colors from '../assets/theme/Colors';
import {PRODUCTS_OVERVIEW} from '../constants/routeName';
import {Text} from 'react-native-paper';
const axios = require('axios');
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';
const WIDTH = Dimensions.get('window').width;

const Productsbycategory = props => {
  const {winecategory} = props.route.params;
  const [masterdata, setmasterdata] = useState([]);
  const [filtereddata, setfilterdata] = useState([]);
  const [searchdata, setsearchdata] = useState('');
  const [isModalVisible, setisModalVisible] = useState(false);

  let token = useSelector(state => state.cart.token);

  useEffect(() => {
    fetchProducts();
    return () => {};
  }, []);

  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };
  const fetchProducts = () => {
    axios
      .get(`${url}/products/category/${winecategory}`)
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setisModalVisible(!isModalVisible);
        }}>
        <TouchableOpacity disabled={true} style={styles.container}>
          <View style={styles.modal}>
            <Icon
              name="checkmark-circle-outline"
              size={90}
              color={Colors.white}
            />
            <View style={styles.modaltext}>
              <Text style={{fontSize: 26}}>Added to Cart Successfully</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false}>
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

        <WineImage />
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
                  const addProduct = itemData.item._id;
                  const config = {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                  };
                  fetch(`${url}/cart/${addProduct}`, config)
                    .then(function (response) {
                      console.log('Added Successfully');
                    })
                    .then(
                      changeModalVisible(true),
                      setTimeout(() => {
                        changeModalVisible(false);
                      }, 1000),
                    )
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
    borderColor: Colors.thistle,
    backgroundColor: 'white',
    margin: 5,
    paddingLeft: 15,
  },
  add_to_cart: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 20,
    flex: 2,
    width: 200,
    height: 110,
    paddingRight: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    height: 200,
    width: WIDTH - 60,
    paddingTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.thistle,
  },

  modaltext: {
    flex: 1,
    fontSize: '30',
  },
});

export default Productsbycategory;
