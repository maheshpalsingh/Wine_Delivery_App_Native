import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Button,
  TextInput,
  Dimensions,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {WineCard, WineImage} from '../components/WineComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import Colors from '../assets/theme/Colors';
import {PRODUCTS_OVERVIEW, URL} from '../constants/routeName';
import {Text} from 'react-native-paper';
import * as productActions from '../store/actions/products';
import LottieView from 'lottie-react-native';
const axios = require('axios');
const WIDTH = Dimensions.get('window').width;

const ProductsScreen = props => {
  const [masterdata, setmasterdata] = useState([]);
  const [filtereddata, setfilterdata] = useState([]);
  const [searchdata, setsearchdata] = useState('');
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  //const productItems = useSelector(state => state.wines.availableProducts);

  let token = useSelector(state => state.cart.token);

  useEffect(() => {
    setVisible(true);
    fetchProducts();
    setTimeout(() => {
      setVisible(false);
    }, 500);
    return () => {};
  }, []);

  const fetchProducts = async () => {
    // await dispatch(productActions.A());
    axios
      .get(`${URL}/products/all`)
      .then(response => {
        setfilterdata(response.data ?? []);
        setmasterdata(response.data ?? []);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const changeModalVisible = bool => {
    setisModalVisible(bool);
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
            {/* <Icon
              name="checkmark-circle-outline"
              size={90}
              color={Colors.white}
            /> */}
            <LottieView
              style={{flex: 1}}
              source={require('./../assets/loader/90283-add-to-cart.json')}
              autoPlay
              loop
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
        {visible && (
          <ActivityIndicator
            animating={visible}
            color={'purple'}
            size={'large'}
          />
        )}
        <FlatList
          data={filtereddata}
          keyExtractor={item => item._id}
          {...props}
          renderItem={({item, index}) => {
            return (
              <View>
                <WineCard
                  image={item.image}
                  winename={item.name}
                  price={item.price}
                  category={item.category}>
                  <Button
                    title="Add To Cart"
                    color={Colors.purple}
                    onPress={() => {
                      const addProduct = item._id;
                      const config = {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}`,
                        },
                      };
                      fetch(`${URL}/cart/${addProduct}`, config)
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
                          productDescription: item.description,
                          productimage: item.image,
                          productPrice: item.price,
                          productCategory: item.category,
                          productName: item.name,
                          productCompany: item.company,
                        });
                      }}
                    />
                  </View>
                </WineCard>
              </View>
            );
          }}
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

export default ProductsScreen;
